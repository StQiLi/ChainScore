import express from "express";
import { testFunction } from "./dist/index.js";
import OpenAI from 'openai-api';

const openai = new OpenAI();

const app = express();
const port = 3000;

async function chain_score() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Given that this is the wallet history in a JSON format:" +  formatted_history + "\n\n. Please given me the results for total number of transactions that took place, \
    and the number of transactions per month on average. Please respond in the format: \n \
        Total Transactions: <Number> \n Average Transactions Per Month: <Decimal>" }],
    model: "gpt-4o",
  });

  console.log(completion.choices[0]);
}

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  const data = testFunction('testnet');
  
  let totalvolume = 0;
  for (let i = 0; i < data.length; i++) {
    totalvolume += data[i].amount;
  }
  let recent_transaction = new Date(data[0].timestamp);
  let oldest_transaction = new Date(data[data.length - 1].timestamp);
  let differenceInSeconds = (recent_transaction.getTime() - oldest_transaction.getTime()) / 1000;

  let average_volume_per_second = totalvolume / differenceInSeconds;
  let average_volume_per_day = average_volume_per_second * 86400;
  let average_volume_per_month = average_volume_per_day * 30;



});