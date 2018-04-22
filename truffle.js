module.exports = {
  // migrations_directory: "./src/migrations",
  // contracts_directory: "./src/contracts/",
  networks: {
    // default
    development: {
      host: "localhost",
      port: 7545,
      network_id: 5777,
    },

    ropsten: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 3,
      gas: 4700000
    },

    // specify by --network local
    local: {
      host: "localhost",
      port: 8545,
      network_id: '*' // 1,2, 42, 1337, * (Match any network id)
    },

    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: 4, // 1,2, 3, 42, 1337, * (Match any network id)
      gas: 4300000, //may be 21000 - 3000000
      gasPrice: 20000000000
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
      enabled: false,
    }
  },
}