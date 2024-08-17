import { defineChain } from 'viem'
 
export const alphanet = defineChain({
  id: 91186,
  name: 'Reth Alphanet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-alphanet-upkwh8kbsq.t.conduit-stg.xyz'],
      webSocket: ['wss://rpc-alphanet-upkwh8kbsq.t.conduit-stg.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer-alphanet-upkwh8kbsq.t.conduit-stg.xyz/' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 5882,
    },
  },
})