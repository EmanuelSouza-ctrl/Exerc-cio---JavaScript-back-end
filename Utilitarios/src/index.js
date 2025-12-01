import express from 'express';
import formatter from './text.js';
import calculator from './number.js';

const app = express();
const PORT = 3000;
app.use(express.json());

const validateText = (req, res, next) => {
  const { input } = req.body;
  if (typeof input !== 'string' || input.trim() === '') {
    return res.status(400).json({ error: 'Input must be a non-empty string.' });
  }
  next();
};

const validateNumbers = (req, res, next) => {
  const input = req.query.input?.trim();
  if (!input) {
    return res.status(400).json({ error: 'Query parameter "input" is required.' });
  }

  const values = input.split(',').map(v => parseFloat(v));
  if (values.some(isNaN) || values.length === 0) {
    return res.status(400).json({ error: 'Input must contain at least one valid number.' });
  }

  req.numbers = values; // nome mais claro que "values"
  next();
};

const TEXT_ACTIONS = ['lowercase', 'uppercase'];
const NUMBER_ACTIONS = ['minimum', 'maximum'];

app.post('/util/text/:action', validateText, (req, res) => {
  const { action } = req.params;
  const { input } = req.body;

  if (!TEXT_ACTIONS.includes(action)) {
    return res.status(404).json({ error: `Action must be one of: ${TEXT_ACTIONS.join(', ')}` });
  }

  res.json({ output: formatter(input, action) });
});

app.get('/util/number/:action', validateNumbers, (req, res) => {
  const { action } = req.params;

  if (!NUMBER_ACTIONS.includes(action)) {
    return res.status(404).json({ error: `Action must be one of: ${NUMBER_ACTIONS.join(', ')}` });
  }

  const result = calculator(req.numbers, action);
  res.json({ result }); // mantive "result" pra diferenciar do "output" do texto
});

app.listen(PORT, () => {
  console.log(`API rodando → http://localhost:${PORT}`);
});
