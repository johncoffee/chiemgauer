const Web3 = require("web3")
const HDWalletProvider = require("truffle-hdwallet-provider")
const API_KEY = 'xSa977dElK0pyDw8ipCV'

const web3 = new Web3(`http://localhost:7545`)

module.exports = {
  // migrations_directory: "./src/migrations",
  // contracts_directory: "./src/contracts/",
  networks: {
    // default
    development: {
      host: "localhost",
      port: 7545,
      network_id: 1337,
      // gasPrice: 5000000000,
      // gas: 4712388,
    },

    rinkfura: {
      provider: function() {
        const mnemonic = 'satoshi impulse morning present drip access tenant begin mention clever fine hurt'
        const unlockIndex = 0
        const provider = new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/${API_KEY}`, unlockIndex)
        const newAddress = provider.getAddress()
        console.log(`rinkfura HDWalletProvider addr ${newAddress}`)
        return provider
      },
      gasPrice: web3.utils.toWei('1', 'gwei'),
      gasLimit:  148073,
               // 67456
      network_id: 4
    },

    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: 4, // 1,2, 3, 42, 1337, * (Match any network id)
      gasPrice: web3.utils.toWei('2', 'shannon'),
      gasLimit: 7048073,
    },

    "ropfura": {
      provider: function() {
        const mnemonic = 'impulse satoshi morning present drip access tenant begin mention fine begin hurt' // 0x3de8d0dd85d62b8d4e5e137eaf31afc736750cb0
        const unlockIndex = 0
        const provider = new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${API_KEY}`, unlockIndex)
        const newAddress = provider.getAddress()
        console.log(`ropfura HDWalletProvider addr ${newAddress}`)
        return provider
      },
      gasPrice: web3.utils.toWei('1', 'gwei'), // cheap 2
      gasLimit: 4600000, // found on etherscan
      network_id: 3
    },

    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: 3, // 1,2, 3, 42, 1337, * (Match any network id)
    },

    // main net. Specify by --network live
    live: {
      host: "mainnet.infura.io",
      port: 80,
      network_id: 1,
    },

    // test chains
    // ropsten: {
    //   provider: new HDWalletProvider("candy maple cake sugar pudding cream honey rich smooth crumble sweet treat", "https://ropsten.infura.io/"),
    //   network_id: 3
    // },
    // rinkeby: {
    //   provider: new HDWalletProvider("candy maple cake sugar pudding cream honey rich smooth crumble sweet treat", "https://rinkeby.infura.io/"), // lol someone funded this account!
    //   network_id: 3
    // },
    // kovan: {
    //   provider: new HDWalletProvider("candy maple clay sugar pudding cream honey rich smooth crumble sweet treat", "https://kovan.infura.io/"),
    //   network_id: 42
    // },
  },

  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
}