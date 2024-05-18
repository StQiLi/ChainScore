import { startStream, types } from '@near-lake/framework';
import { Block, ActionReceipt, ExecutionOutcomeWithReceipt } from '@near-lake/primitives';
import * as fs from 'fs';

// Specify the NEAR Lake configuration
const lakeConfig: types.LakeConfig = {
  s3BucketName: 'near-lake-data-mainnet',
  s3RegionName: 'us-east-1',
  startBlockHeight: 0,
};

// The NEAR wallet to track
const targetWallet = 'example.near';

// File to save the transaction history
const outputFilePath = './transaction_history.json';

interface TransactionDetail {
  blockHeight: number;
  timestamp: string;
  transactionId: string;
  receiverId: string;
  signerId: string;
  status: string;
  amount: number;
}

let transactionHistory: TransactionDetail[] = [];

// Load existing transaction history if the file exists
if (fs.existsSync(outputFilePath)) {
  transactionHistory = JSON.parse(fs.readFileSync(outputFilePath, 'utf-8'));
}

const handleBlock = async (block: Block): Promise<void> => {
  const receipts = block.receipts();

  receipts.forEach((receipt) => {
    if (receipt instanceof ActionReceipt) {
      const { receiverId, receiptId, actions } = receipt;
      const executionOutcome = block.actionByReceiptId(receiptId);

      if (receiverId === targetWallet || (executionOutcome && executionOutcome.executorId === targetWallet)) {
        let transferAmount = 0;

        actions.forEach((action) => {
          if ('Transfer' in action) {
            transferAmount += parseInt(action.Transfer.deposit, 10);
          }
        });

        const transactionDetails: TransactionDetail = {
          blockHeight: block.blockHeight,
          timestamp: new Date(parseInt(block.header().timestampNanosec) / 1e6).toISOString(),
          transactionId: receiptId,
          receiverId,
          signerId: executionOutcome ? executionOutcome.executorId : '',
          status: executionOutcome ? JSON.stringify(executionOutcome.status) : 'unknown',
          amount: transferAmount / 1e24, // Convert yoctoNEAR to NEAR
        };

        transactionHistory.push(transactionDetails);
        console.log('Transaction found:', transactionDetails);

        // Save the updated transaction history to the file
        fs.writeFileSync(outputFilePath, JSON.stringify(transactionHistory, null, 2));
      }
    }
  });
};

const main = async () => {
  await startStream(lakeConfig, handleBlock);
};

main().catch(console.error);
