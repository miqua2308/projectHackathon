const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');

// Initialize Solana connection
const connection = new Connection(
  process.env.SOLANA_RPC_URL || clusterApiUrl('devnet'), // Use mainnet-beta for production
  'confirmed'
);

/**
 * Get the SOL balance of an escrow address
 * @param {string} escrowAddress - The escrow wallet address
 * @returns {number} Balance in SOL
 */
const getEscrowBalance = async (escrowAddress) => {
  try {
    if (!escrowAddress) return 0;
    
    const publicKey = new PublicKey(escrowAddress);
    const balance = await connection.getBalance(publicKey);
    
    // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
    return balance / 1000000000;
  } catch (error) {
    console.error('Error getting escrow balance:', error);
    return 0;
  }
};

/**
 * Get token balance (USDC, etc.) for an address
 * @param {string} address - Wallet address
 * @param {string} mintAddress - Token mint address (e.g., USDC mint)
 * @returns {number} Token balance
 */
const getTokenBalance = async (address, mintAddress) => {
  try {
    const { getAssociatedTokenAddress, getAccount } = require('@solana/spl-token');
    
    const walletPublicKey = new PublicKey(address);
    const mintPublicKey = new PublicKey(mintAddress);
    
    const associatedTokenAddress = await getAssociatedTokenAddress(
      mintPublicKey,
      walletPublicKey
    );
    
    const account = await getAccount(connection, associatedTokenAddress);
    return Number(account.amount) / Math.pow(10, 6); // USDC has 6 decimals
  } catch (error) {
    console.error('Error getting token balance:', error);
    return 0;
  }
};

/**
 * Get transaction history for an address
 * @param {string} address - Wallet address to get history for
 * @param {number} limit - Number of transactions to fetch
 * @returns {Array} Array of transaction objects
 */
const getTransactionHistory = async (address, limit = 50) => {
  try {
    if (!address) return [];
    
    const publicKey = new PublicKey(address);
    
    // Get transaction signatures
    const signatures = await connection.getSignaturesForAddress(
      publicKey,
      { limit }
    );
    
    // Get full transaction details
    const transactions = [];
    
    for (const sig of signatures) {
      try {
        const transaction = await connection.getTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0
        });
        
        if (transaction) {
          transactions.push({
            signature: sig.signature,
            timestamp: sig.blockTime ? new Date(sig.blockTime * 1000) : null,
            status: transaction.meta?.err ? 'failed' : 'success',
            fee: transaction.meta?.fee || 0,
            amount: getTransactionAmount(transaction, address),
            from: getTransactionSender(transaction),
            to: getTransactionReceiver(transaction),
            raw: transaction // Include full transaction data
          });
        }
      } catch (txError) {
        console.error(`Error fetching transaction ${sig.signature}:`, txError);
      }
    }
    
    return transactions;
  } catch (error) {
    console.error('Error getting transaction history:', error);
    return [];
  }
};

/**
 * Extract transaction amount (simplified - you may need to customize this)
 * @param {Object} transaction - Solana transaction object
 * @param {string} address - Address to check amount for
 * @returns {number} Transaction amount in SOL
 */
const getTransactionAmount = (transaction, address) => {
  try {
    const accountKeys = transaction.transaction.message.accountKeys;
    const addressIndex = accountKeys.findIndex(key => key.toBase58() === address);
    
    if (addressIndex !== -1 && transaction.meta?.postBalances && transaction.meta?.preBalances) {
      const preBalance = transaction.meta.preBalances[addressIndex];
      const postBalance = transaction.meta.postBalances[addressIndex];
      const difference = postBalance - preBalance;
      
      return Math.abs(difference) / 1000000000; // Convert lamports to SOL
    }
    
    return 0;
  } catch (error) {
    console.error('Error calculating transaction amount:', error);
    return 0;
  }
};

/**
 * Get transaction sender (simplified)
 * @param {Object} transaction - Solana transaction object
 * @returns {string} Sender address
 */
const getTransactionSender = (transaction) => {
  try {
    // The first account is usually the fee payer/sender
    return transaction.transaction.message.accountKeys[0]?.toBase58() || 'Unknown';
  } catch (error) {
    return 'Unknown';
  }
};

/**
 * Get transaction receiver (simplified)
 * @param {Object} transaction - Solana transaction object
 * @returns {string} Receiver address
 */
const getTransactionReceiver = (transaction) => {
  try {
    // This is simplified - in reality, you'd need to parse the instruction data
    // to determine the actual receiver based on your program's logic
    const accounts = transaction.transaction.message.accountKeys;
    return accounts.length > 1 ? accounts[1].toBase58() : 'Unknown';
  } catch (error) {
    return 'Unknown';
  }
};

/**
 * Verify if a specific transaction hash exists and is successful
 * @param {string} transactionHash - Transaction signature to verify
 * @returns {Object} Verification result
 */
const verifyTransaction = async (transactionHash) => {
  try {
    const transaction = await connection.getTransaction(transactionHash, {
      maxSupportedTransactionVersion: 0
    });
    
    if (!transaction) {
      return { exists: false, success: false, error: 'Transaction not found' };
    }
    
    const success = transaction.meta?.err === null;
    
    return {
      exists: true,
      success,
      timestamp: transaction.blockTime ? new Date(transaction.blockTime * 1000) : null,
      fee: transaction.meta?.fee || 0,
      error: transaction.meta?.err || null
    };
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return { exists: false, success: false, error: error.message };
  }
};

/**
 * Get current network status and slot
 * @returns {Object} Network information
 */
const getNetworkInfo = async () => {
  try {
    const slot = await connection.getSlot();
    const blockTime = await connection.getBlockTime(slot);
    
    return {
      currentSlot: slot,
      blockTime: blockTime ? new Date(blockTime * 1000) : null,
      network: process.env.SOLANA_NETWORK || 'devnet'
    };
  } catch (error) {
    console.error('Error getting network info:', error);
    return null;
  }
};

class SolanaService {
  constructor() {
    // Initialize connection to Solana cluster
    this.connection = null;
    this.cluster = process.env.SOLANA_CLUSTER || 'devnet'; // devnet, testnet, or mainnet-beta
    this.rpcUrl = process.env.SOLANA_RPC_URL || clusterApiUrl(this.cluster);
  }

  // Initialize connection
  async initConnection() {
    try {
      this.connection = new Connection(this.rpcUrl, 'confirmed');
      console.log(`🔗 Solana connection initialized to ${this.cluster}`);
      return this.connection;
    } catch (error) {
      console.error('Failed to initialize Solana connection:', error);
      throw error;
    }
  }

  // Test connection by getting version
  async testConnection() {
    try {
      if (!this.connection) {
        await this.initConnection();
      }

      const version = await this.connection.getVersion();
      const slot = await this.connection.getSlot();
      const blockHeight = await this.connection.getBlockHeight();
      
      return {
        connected: true,
        cluster: this.cluster,
        rpcUrl: this.rpcUrl,
        version: version,
        currentSlot: slot,
        blockHeight: blockHeight,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Solana connection test failed:', error);
      return {
        connected: false,
        cluster: this.cluster,
        rpcUrl: this.rpcUrl,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Get account balance
  async getBalance(publicKeyString) {
    try {
      if (!this.connection) {
        await this.initConnection();
      }

      const publicKey = new PublicKey(publicKeyString);
      const balance = await this.connection.getBalance(publicKey);
      
      return {
        publicKey: publicKeyString,
        balance: balance,
        balanceSOL: balance / 1000000000, // Convert lamports to SOL
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get balance:', error);
      throw error;
    }
  }

  // Get account info
  async getAccountInfo(publicKeyString) {
    try {
      if (!this.connection) {
        await this.initConnection();
      }

      const publicKey = new PublicKey(publicKeyString);
      const accountInfo = await this.connection.getAccountInfo(publicKey);
      
      return {
        publicKey: publicKeyString,
        exists: accountInfo !== null,
        accountInfo: accountInfo ? {
          lamports: accountInfo.lamports,
          owner: accountInfo.owner.toString(),
          executable: accountInfo.executable,
          rentEpoch: accountInfo.rentEpoch,
          dataLength: accountInfo.data.length
        } : null,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get account info:', error);
      throw error;
    }
  }

  // Get recent blockhash
  async getRecentBlockhash() {
    try {
      if (!this.connection) {
        await this.initConnection();
      }

      const { blockhash, feeCalculator } = await this.connection.getRecentBlockhash();
      
      return {
        blockhash,
        feeCalculator,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get recent blockhash:', error);
      throw error;
    }
  }

  // Get connection object for other services
  getConnection() {
    return this.connection;
  }
}

module.exports = new SolanaService();