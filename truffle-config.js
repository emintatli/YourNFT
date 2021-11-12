const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {  
  contracts_build_directory:"./public/contracts",

  networks: {
   
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    ropsten:{
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: "ritual little buffalo tobacco anchor lunch wing tube tower color private solve"
          },
          providerOrUrl: "https://ropsten.infura.io/v3/28e6a305c46440f5ade79261f21a317b",
          addressIndex:0
        }),
        network_id:3,
        gas:5500000,// gas Limit
        gasPrice:20000000000,
        confirmations:10, // numbber of blocks  to wait between bloks
        timeoutBlocks:400 , // number of blocks before timeout

    },
    goerli:{
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: "ritual little buffalo tobacco anchor lunch wing tube tower color private solve"
          },
          providerOrUrl: "https://goerli.infura.io/v3/087c0c70b7694e038af9109e50de0ae2",
          addressIndex:0
        }),
        network_id:5,
        gas:5500000,// gas Limit
        gasPrice:20000000000,
        confirmations:10, // numbber of blocks  to wait between bloks
        timeoutBlocks:400 , // number of blocks before timeout

    },
    bsctestnet: {  // 0x61
      provider: () => new HDWalletProvider("ritual little buffalo tobacco anchor lunch wing tube tower color private solve", `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200
    },
    polygontestnet:{ // 0x13881
      provider: () => new HDWalletProvider("ritual little buffalo tobacco anchor lunch wing tube tower color private solve", `https://rpc-mumbai.maticvigil.com/`),
      network_id: 80001,
      confirmations: 10,
      timeoutBlocks: 200
    }
  },


  compilers: {
    solc: {
      version: "0.8.4", 
    }
  },

};
