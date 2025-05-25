import React, { createContext, useContext, useState, useEffect } from "react";
import { Connection } from "@solana/web3.js";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";



interface WalletContextType {
  isConnected: boolean;
  publicKey: string | null;
  balance: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    publicKey,
    connected,
    connect: solanaConnect,
    disconnect: solanaDisconnect,
  } = useSolanaWallet();
  const [balance, setBalance] = useState<number | null>(null);

  // Initialize Solana connection
  const connection = new Connection(
    import.meta.env.VITE_SOLANA_RPC_URL ||
      "https://api.mainnet-beta.solana.com",
    "confirmed"
  );

  useEffect(() => {
    const getBalance = async () => {
      if (publicKey) {
        try {
          const bal = await connection.getBalance(publicKey);
          setBalance(bal / 1e9); // Convert lamports to SOL
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        }
      } else {
        setBalance(null);
      }
    };

    getBalance();
  }, [publicKey, connection]);

  const connect = async () => {
    try {
      await solanaConnect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnect = () => {
    solanaDisconnect();
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected: connected,
        publicKey: publicKey?.toString() || null,
        balance,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
