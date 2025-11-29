const express = require('express');
const formatter = require('./text');
const calculator = require('./number');

const app = express();
const port = 3000;

app.use(express.json());

// Text utilities
app.post('/util/text/lowercase', (req, res) => {
  const { input } = req.body;
  if (!input || typeof input !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing input' });
  }
  const output = formatter(input, 'lowercase');
  res.json({ output });
});

app.post('/util/text/uppercase', (req, res) => {
  const { input } = req.body;
  if (!input || typeof input !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing input' });
  }
  const output = formatter(input, 'uppercase');
  res.json({ output });
});

// Number utilities
app.get('/util/number/minimum', (req, res) => {
  const input = req.query.input;
  if (!input) {
    return res.status(400).send('Missing input');
  }
  const values = input.split(',').map(num => parseFloat(num.trim()));
  if (values.some(isNaN)) {
    return res.status(400).send('Invalid numbers in input');
  }
  const result = calculator(values, 'minimum');
  res.send(result.toString());
});

app.get('/util/number/maximum', (req, res) => {
  const input = req.query.input;
  if (!input) {
    return res.status(400).send('Missing input');
  }
  const values = input.split(',').map(num => parseFloat(num.trim()));
  if (values.some(isNaN)) {
    return res.status(400).send('Invalid numbers in input');
  }
  const result = calculator(values, 'maximum');
  res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});