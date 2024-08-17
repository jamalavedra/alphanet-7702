
import { createPublicClient, createWalletClient, getContract, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts'
import * as dotenv from 'dotenv';
import {abi as batchInvokerABI, contractAddress as batchInvokerAddress} from './batchinvokerABI'
import { alphanet } from './rethAlphanet';
import { eip7702Actions } from 'viem/experimental'

dotenv.config();

console.info('Start');


(async () => {
    
        const pk = process.env.PRIVATE_KEY_EOA! as `0x${string}`;
        const account = privateKeyToAccount(pk)

        const address = account.address;
        console.log(`Address: ${address}`)
        const walletClient = createWalletClient({
            account,
            chain: alphanet,
            transport: http()
          }).extend(eip7702Actions()) 

          const publicClient = createPublicClient({
            chain: alphanet,
            transport: http()
          })
          
          const batchCallInvoker = getContract({
            abi: batchInvokerABI,
            address: walletClient.account.address,
            client: walletClient
          })

        try {
            const invoker = privateKeyToAccount(process.env.PRIVATE_KEY_INVOKER! as `0x${string}`) 

            const authorization = await walletClient.signAuthorization({ 
                contractAddress: batchInvokerAddress, 
              }) 
              const EOAAddress = "0x37eC246fCD668400Df5dAA5362601dB613BAcC84"
              const { result, request} = await batchCallInvoker.simulate.execute([[{ 
                data: '0x',
                to: EOAAddress, 
                value: parseEther('0.00000001'), 
            }, { 
                data: '0x', 
                to: EOAAddress, 
                value: parseEther('0.0000002'), 
            }]], { 
                account: invoker,
                authorizationList: [authorization], 
            }) 
            console.log(`result: ${JSON.stringify(result, null, 2)}`)
            const hash = await walletClient.writeContract(request)

            console.log(`hash: ${hash}`)
            const receipt = await publicClient.waitForTransactionReceipt({hash})
            console.log(`receipt: ${JSON.stringify(
                receipt,
                (key, value) => (typeof value === 'bigint' ? value.toString() : value),
                2
              )}`)
        } catch (e) {
            console.error(e);
        }


    console.info('End');
})();