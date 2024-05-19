import express from "express";
import { testFunction } from "./dist/index.js";
import OpenAI from 'openai-api';

const openai = new OpenAI();

const app = express();
const port = 3000;

async function chain_score(formatted_history, totalvolume, average_volume_per_second, average_volume_per_day, differenceInSeconds) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Given that this is the wallet history in a JSON format: ${formatted_history} \n\n
    And the fact that the following metrics for the wallet are:
    \n1) total volume in NEAR: ${totalvolume}
    \n2) average volume per second (NEAR/sec): ${average_volume_per_second}
    \n3) average volume per day (NEAR/day): ${average_volume_per_day}
    \n4) time between most recent transaction and earliest known transaction in seconds: ${differenceInSeconds}
    \n5) frequency: based upon data provided by the wallet history
    \n6) wallet size: assuming the wallet size is at most 1.5 times the total volume
    \n.Provide a rating out of 10 for the following metrics to measure health of the wallet assuming a normal distribution unless otherwise specified for the metrics based on the average expected size of a NEAR wallet is 3000 NEAR and 
    having an average 2.7 transactions in a day:
    \n a) Total Volume: total volume traded.
    \n b) Average Volume: taking into account the average volume per day and second
    \n c) Recent Frequency: taking into account the amount of times a wallet trades within a 3-hour, 6-hour, 12-hour, and 24-hour period
    \n d) History: Time since earliest known transaction, taking into account that 112924800 is the maximum time since most recent and earliest known can be and scaling score exponentially as the time since earliest known transaction was released.
    \n e) Total Wallet Health: Rating the overall wallet health factoring in the previous scores in an account.
    \n\n Make sure to format the answer in a string format with and return the following with nothing else:\n
    { 
      "totalvolumescore": "answer to a)",
      "averagevolumescore": "answer to b)",
      "frequencyscore": "answer to c)",
      "historyscore": "answer to d)",
      "wallethealth": "answer to e)",
    }
    `
   }],
    model: "gpt-4o",
  });

  return(completion.choices[0]);
}

app.get('/wallet', (req, res) => {
  try {

  const data = testFunction('testnet'); // This is the user that needs to be changed based upon input from frontend
    
  let totalvolume = 0;
  for (let i = 0; i < data.length; i++) {
    totalvolume += data[i].amount;
  }
  let recent_transaction = new Date(data[0].timestamp);
  let oldest_transaction = new Date(data[data.length - 1].timestamp);
  let differenceInSeconds = (recent_transaction.getTime() - oldest_transaction.getTime()) / 1000;

  let average_volume_per_second = totalvolume / differenceInSeconds;
  let average_volume_per_day = average_volume_per_second * 86400;
  const chainscore_jsonobj = JSON.parse(await(chain_score(data, average_volume_per_second, average_volume_per_day, differenceInSeconds)));

  res.json({
    data, 
    chainscore: chainscore_jsonobj
  })
} catch (error) {
  console.error('Error fetching chain score:', error); 
  res.status(500).send('Internal Server Error')
}
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  const data = testFunction('testnet'); // This is the user that needs to be changed based upon input from frontend
    
  let totalvolume = 0;
  for (let i = 0; i < data.length; i++) {
    totalvolume += data[i].amount;
  }
  let recent_transaction = new Date(data[0].timestamp);
  let oldest_transaction = new Date(data[data.length - 1].timestamp);
  let differenceInSeconds = (recent_transaction.getTime() - oldest_transaction.getTime()) / 1000;

  let average_volume_per_second = totalvolume / differenceInSeconds;
  let average_volume_per_day = average_volume_per_second * 86400;
  const chainscore_jsonobj = JSON.parse(await(chain_score(data, average_volume_per_second, average_volume_per_day, differenceInSeconds)));


});
