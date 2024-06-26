import OpenAI from 'openai-api';

const openai = new OpenAI('a');

const apiKey = 'a';
const o = new OpenAI();

async function chain_score(formatted_history, totalvolume, average_volume_per_second, average_volume_per_day, differenceInSeconds) {
  try {
    const completion = await o.chat.completions.create({
      messages: [{
        role: "system",
        content: `Given that this is the wallet history in a JSON format: ${formatted_history} \n\n
        And the fact that the following metrics for the wallet are:
        \n1) total volume in NEAR: ${totalvolume}
        \n2) average volume per second (NEAR/sec): ${average_volume_per_second}
        \n3) average volume per day (NEAR/day): ${average_volume_per_day}
        \n4) time between most recent transaction and earliest known transaction in seconds: ${differenceInSeconds}
        \n5) frequency: based upon data provided by the wallet history
        \n6) wallet size: assuming the wallet size is at most 1.5 times the total volume
        \n.Provide a rating out of 10 unless otherwise specified for the following metrics to measure health of the wallet assuming a normal distribution unless otherwise specified for the metrics based on the average expected size of a NEAR wallet is 3000 NEAR and 
        having an average 2.7 transactions in a day:
        \n a) Total Volume: total volume traded.
        \n b) Average Volume: taking into account the average volume per day and second
        \n c) Recent Frequency: taking into account the amount of times a wallet trades within a 3-hour, 6-hour, 12-hour, and 24-hour period
        \n d) History: Time since earliest known transaction, taking into account that 112924800 is the maximum time since most recent and earliest known can be and scaling score exponentially as the time since earliest known transaction was released.
        \n e) Total Wallet Health: Rating the overall wallet health factoring in the previous scores in an account.
        \n f) Suggested Loan Volume: Provide a loan volume integer not limited by 10. This should be 33% of the average volume per month and add or subtract up to 10% of the average volume per month based upon being greater or less than 5 Total Wallet Health, respectively.
        \n\n Make sure to format the answer in a string format with each of the "answer to _)" replaced by an integer and return the following with nothing else:\n
        [{ 
          "totalvolumescore": "answer to a)",
          "averagevolumescore": "answer to b)",
          "frequencyscore": "answer to c)",
          "historyscore": "answer to d)",
          "wallethealth": "answer to e)",
          "suggestedloanvolume": "answer to f)",
        }],
        `
      }],
    });

    return completion.data.choices[0].message.content;
  } catch (error) {
    if (error instanceof ZodError) {
       return new NextResponse("Invalid Body", { status: 400 });
    }
    return new NextResponse("Internal server error", { status: 500 });
  }

}

const data = [{
  "blockNumber": 164021770,
  "timestamp": "2024-05-19T10:26:46.680Z",
  "transactionId": "H5yjNE63YZxB4LC2J596ATKGgphgt4qrEj5btaEbnGfg",
  "receiverId": "temp-1716114405179.testnet",
  "signerId": "testnet",
  "status": "success",
  "amount": 10.000001000000001
}];

// Calculate the required parameters
let totalvolume = 0;
for (let i = 0; i < data.length; i++) {
  totalvolume += data[i].amount;
}

let recent_transaction = new Date(data[0].timestamp);
let oldest_transaction = new Date(data[data.length - 1].timestamp);
let differenceInSeconds = (recent_transaction.getTime() - oldest_transaction.getTime() + 1000) / 1000;

let average_volume_per_second = totalvolume / differenceInSeconds;
let average_volume_per_day = average_volume_per_second * 86400;

console.log('recent_transaction:', recent_transaction);
console.log('oldest_transaction:', oldest_transaction);
console.log('differenceInSeconds:', differenceInSeconds);
console.log('average_volume_per_second:', average_volume_per_second);
console.log('average_volume_per_day:', average_volume_per_day);


const formatted_history = JSON.stringify(data);

// Test the function
(async () => {
  try {
    console.log(formatted_history);
    console.log(totalvolume);
    console.log(average_volume_per_second);
    console.log(average_volume_per_day);
    const result = await chain_score(
      formatted_history,
      totalvolume,
      average_volume_per_second,
      average_volume_per_day,
      differenceInSeconds
    );
    console.log('Chain Score Result:', result);
  } catch (error) {
    console.error('Test failed:', error);
  }
})();
