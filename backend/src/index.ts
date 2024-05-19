import axios from 'axios';

const rpcEndpoints = {
  mainnet: 'https://rpc.mainnet.near.org',
  testnet: 'https://rpc.testnet.near.org',
  betanet: 'https://rpc.betanet.near.org',
  localnet: 'http://localhost:3030',
};


interface JsonRpcRequest {
  jsonrpc: string;
  id: string | number;
  method: string;
  params: any;
}

interface TransactionDetail {
    blockNumber: number;
    timestamp: string;
    transactionId: string;
    receiverId: string;
    signerId: string;
    status: string;
    amount: number;
}

const nearRpcRequest = async (endpoint: string, id: string, method: string, params: any) => {
  const requestData: JsonRpcRequest = {
        "jsonrpc": "2.0",
        "id": id,
        "method": method,
        "params": params,
    }

  try {
    const response = await axios.post(endpoint, requestData);
    return response.data;
  } catch (error) {
    console.error('Error making RPC request:', error);
    throw error;
  }
};

const getStatus = async (network: 'mainnet' | 'testnet' | 'betanet' | 'localnet', id: string, method: string, params: any) => {
  const endpoint = rpcEndpoints[network];
  const response = await nearRpcRequest(endpoint, id, method, params);
  return response;
};

export const testFunction = async (targetaccount: string) => {
    const transactions: TransactionDetail[] = [];
  try {
    let blockHeight = (await getStatus('testnet', 'dontcare', 'block', {"finality": "final"})).result.header.height

    let blockHeightMaxCheck = 1000;
    console.log(blockHeight);
    while (blockHeight > 0 && blockHeightMaxCheck > 0) {
        const block = await getStatus('testnet', 'dontcare', 'block', {"block_id": blockHeight});
        if (block.result !== undefined) {
            const blockTimestamp = new Date(parseInt(block.result.header.timestamp_nanosec) / 1e6).toISOString();
            console.log(`Processing block ${blockHeight} at ${blockTimestamp}`);

            // console.log(block.result.header.chunks_included);
            // console.log(block.result.chunks[0].chunk_hash);
            for (let i = 0; i < block.result.header.chunks_included; i++) {
                const chunkHash = block.result.chunks[i].chunk_hash;
                const chunk = await getStatus('testnet', 'dontcare', 'chunk', {"chunk_id": chunkHash});
                // console.log(`Processing chunk ${chunkHash}`);

                for (let transaction of chunk.result.transactions) {
                    // console.log(transaction);
                    if (transaction.signer_id === targetaccount || transaction.receiver_id === targetaccount) {
                        // Extract transfer actions and calculate the amount
                        let transferAmount = 0;
                        // console.log(transferAmount);
                        for (let action of transaction.actions) {
                            if (action.Transfer) {
                                // console.log("action:", action);
                                // console.log("action.Transfer:", action.Transfer);
                                transferAmount += parseInt(action.Transfer.deposit, 10);
                                // console.log(transferAmount);
                            }
                        }
            
                        // Include only successful transactions
                        let transactionStatus = Object();
                        if (transaction.receiver_id === targetaccount) {
                            transactionStatus = await getStatus('testnet', 'dontcare', 'EXPERIMENTAL_tx_status', { tx_hash: transaction.hash, sender_account_id: transaction.signer_id });
                        } else {
                            transactionStatus = await getStatus('testnet', 'dontcare', 'EXPERIMENTAL_tx_status', { tx_hash: transaction.hash, sender_account_id: transaction.receiver_id });
                        }
                        // console.log("obtained transaction status");
                        // console.log(transactionStatus);
                        if (transactionStatus.result.status.SuccessValue !== undefined) {
                            const transactionDetails: TransactionDetail = {
                            blockNumber: block.result.header.height,
                            timestamp: blockTimestamp,
                            transactionId: transaction.hash,
                            receiverId: transaction.receiver_id,
                            signerId: transaction.signer_id,
                            status: 'success',
                            amount: transferAmount / 1e24, // Convert yoctoNEAR to NEAR
                            };
                            transactions.push(transactionDetails);
                            // console.log(transactionDetails);
                        }
                    }
                }
            }
        }
        blockHeight--;
        blockHeightMaxCheck--;
    }

    return transactions;

    // const status = await getStatus('testnet', 'dontcare', 'block', {"finality": "final"});
    // //console.log(status);
    // for (let i = 0; i < status.result.header.chunks_included; i++) {
    //     chunks_hashes.push(status.result.chunks[i].chunk_hash);
    //     console.log(chunks_hashes[i])
    //     const status2 = await getStatus('testnet', 'dontcare', 'chunk', {"chunk_id": chunks_hashes[i]});
    //     console.log(status2);

    //     for (let j = 0; j < status2.result.transactions.length; j++) {
    //         console.log(status2.result.transactions[j]);
    //         transactions.push(status2.result.transactions[j]); 
    //     }
    //     for (let j = 0; j < status2.result.receipts.length; j++) {
    //         console.log(status2.result.receipts[j]);
    //     }
    // }

  } catch (error) {
    console.error('Error:', error);
  }
};
