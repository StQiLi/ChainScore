import express from "express";
import { testFunction } from "./dist/index.js";


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  const data = testFunction('testnet');
  
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
  }

});