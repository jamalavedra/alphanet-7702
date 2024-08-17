export const abi = [
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "components": [
          {
            "name": "data",
            "type": "bytes",
          },
          {
            "name": "to",
            "type": "address",
          },
          {
            "name": "value",
            "type": "uint256",
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
] as const

export const contractAddress= "0xc954e82f1b8780D89Ab5D1C02FCB727a436a3bBA"
