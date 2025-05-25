// tests/testSolanaConnection.js
const axios = require('axios');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

// Test configuration
const TESTS = {
  // Test wallet addresses (these are example addresses)
  TEST_WALLET: '84txZqLFBBPoAo6dVGYDRP1dNwH1GyGBNP3d9yY4NsJt',// System Program
  SAMPLE_WALLET: '84txZqLFBBPoAo6dVGYDRP1dNwH1GyGBNP3d9yY4NsJt', // Wrapped SOL
};

async function testSolanaConnection() {
  console.log('🧪 Starting Solana Connection Tests...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check Response:', JSON.stringify(healthResponse.data, null, 2));
    console.log('');

    // Test 2: Solana Connection Test
    console.log('2️⃣ Testing Solana Connection...');
    const connectionResponse = await axios.get(`${BASE_URL}/api/solana/test-connection`);
    console.log('✅ Connection Test Response:', JSON.stringify(connectionResponse.data, null, 2));
    console.log('');

    // Test 3: Cluster Info
    console.log('3️⃣ Testing Cluster Info...');
    const clusterResponse = await axios.get(`${BASE_URL}/api/solana/cluster-info`);
    console.log('✅ Cluster Info Response:', JSON.stringify(clusterResponse.data, null, 2));
    console.log('');

    // Test 4: Get Balance
    console.log('4️⃣ Testing Balance Retrieval...');
    try {
      const balanceResponse = await axios.get(`${BASE_URL}/api/solana/balance/${TESTS.TEST_WALLET}`);
      console.log('✅ Balance Response:', JSON.stringify(balanceResponse.data, null, 2));
    } catch (error) {
      console.log('⚠️  Balance test failed:', error.response?.data || error.message);
    }
    console.log('');

    // Test 5: Get Account Info
    console.log('5️⃣ Testing Account Info...');
    try {
      const accountResponse = await axios.get(`${BASE_URL}/api/solana/account/${TESTS.SAMPLE_WALLET}`);
      console.log('✅ Account Info Response:', JSON.stringify(accountResponse.data, null, 2));
    } catch (error) {
      console.log('⚠️  Account info test failed:', error.response?.data || error.message);
    }
    console.log('');

    // Test 6: Get Recent Blockhash
    console.log('6️⃣ Testing Recent Blockhash...');
    const blockhashResponse = await axios.get(`${BASE_URL}/api/solana/blockhash`);
    console.log('✅ Blockhash Response:', JSON.stringify(blockhashResponse.data, null, 2));
    console.log('');

    // Test 7: Solana Service Health
    console.log('7️⃣ Testing Solana Service Health...');
    const solanaHealthResponse = await axios.get(`${BASE_URL}/api/solana/health`);
    console.log('✅ Solana Health Response:', JSON.stringify(solanaHealthResponse.data, null, 2));
    console.log('');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Make sure your server is running on', BASE_URL);
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  testSolanaConnection();
}

module.exports = testSolanaConnection;