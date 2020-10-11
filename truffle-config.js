var HDWalletProvider = require("truffle-hdwallet-provider");
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    develop: {
      port: 7545
    },
    azureNetwork: {
      provider: new HDWalletProvider("sand useless seed program lizard mushroom asthma palm knee resemble invite game","http://ethubuadn-dns-reg1.eastus.cloudapp.azure.com:8540"),
      network_id: "*",
      gasPrice:0
    }
  },
  compilers: {
    solc: { 
      version: "^0.4.24",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
  
};
