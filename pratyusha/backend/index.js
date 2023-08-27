import express from "express";
import connectDB from "./mongo.js";
import cors from 'cors';
import record from "./schema.js";
const app = express();
const PORT = 3000;

const operations = {
  plus: (a, b) => a + b,
  minus: (a, b) => a - b,
  into: (a, b) => a * b,
};

app.use(cors());
app.use(express.json());
connectDB('mongodb+srv://pratyx:pratyusha89@cluster0.spmsba5.mongodb.net/?retryWrites=true&w=majority')
app.get('/history', async (req, res) => {
    const history=await record.find().limit(20);
  res.send(history);
});
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
  });

app.get('/:params*', async (req, res) => {
    const params = req.params.params.split('&');
    if (params.length % 2 !== 1) {
      res.status(400).send('Invalid request');
      return;
    }
  
    let result = parseInt(params[0]);
    let isValid = true; // Flag to track validity
  
    for (let i = 1; i < params.length-1; i += 2) {
      const operator = params[i];
      const operand = parseInt(params[i + 1]);
      if (!isNaN(operand) && operations[operator]) {
        result = operations[operator](result, operand);
      } else {
        isValid = false;
        break; // Exit the loop on invalid input
      }
    }
  
    if (isValid) {
      const question = params.join(' ');
      const answer = result;
      const entry = new record({ question: question, answer: result });
      await entry.save();
      res.json({ question, answer });
    } else {
      res.status(400).send('Invalid request');
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});