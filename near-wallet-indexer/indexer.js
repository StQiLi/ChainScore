const { startStream } = require('near-lake-framework');
const fs = require('fs');


const config = {
  s3BucketName: 'near-lake-data-mainnet',
  s3RegionName: 'us-east-1',
  startBlockHeight: 0,
  //AWS Credentials
};

const walletsTracked = [];

//Get this from the frontend user input
const targetWallet = 'example.near';
const outputFilePath = './'+ targetWallet + '_transaction_history.json';
let transactionHistory = [];

if (walletsTracked.includes(targetWallet)) {
    console.error('Wallet is already being tracked');
    //connect to MongoDB and pull JSON file with transaction history
} else {
    walletsTracked.push(targetWallet);
}

//temporarily here, remove when connecting to MongoDB 
if (fs.existsSync(outputFilePath)) {
    transactionHistory = JSON.parse(fs.readFileSync(outputFilePath));
  }
// Testing
if (!targetWallet) {
  console.error('Please provide a target wallet to track');
  process.exit(1);
}

//Handle block function
const handleBlock = async (block) => {
    block.shards.forEach(shard => {
      shard.receiptExecutionOutcomes.forEach(outcome => {
        const { receipt, executionOutcome } = outcome;
  
        // Check if the transaction involves the target wallet
        if (receipt.receiverId === targetWallet || executionOutcome.executorId === targetWallet) {
          let transferAmount = 0;
  
          // Check each action for Transfer action
          receipt.actions.forEach(action => {
            if (action.Transfer) {
              transferAmount += parseInt(action.Transfer.deposit, 10);
            }
          });
  
          const transactionDetails = {
            blockHeight: block.header.height,
            timestamp: new Date(block.header.timestamp / 1e6).toISOString(),
            transactionId: receipt.receiptId,
            receiverId: receipt.receiverId,
            signerId: executionOutcome.executorId,
            status: executionOutcome.status,
            amount: transferAmount / 1e24, // Convert yoctoNEAR to NEAR
          };
  
          transactionHistory.push(transactionDetails);
          console.log('Transaction found:', transactionDetails);
  
          // Save the updated transaction history to the file
          fs.writeFileSync(outputFilePath, JSON.stringify(transactionHistory, null, 2));
          
          //connect to MongoDB and update JSON file with transaction history
        }
      });
    });
  };

const main = async () => {
  await startStream(config, handleBlock);
};

main().catch(console.error);
