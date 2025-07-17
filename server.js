import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Models
const Transaction = mongoose.model('Transaction', {
  text: String,
  amount: Number,
  type: String
});

const Balance = mongoose.model('Balance', {
  amount: Number
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/balance', async (req, res) => {
  const balance = await Balance.findOne();
  res.json(balance || null);
});

app.post('/balance', async (req, res) => {
  await Balance.deleteMany(); // reset balance
  const newBalance = new Balance({ amount: req.body.amount });
  await newBalance.save();
  res.json(newBalance);
});

app.get('/transactions', async (req, res) => {
  const transactions = await Transaction.find().sort({ _id: -1 });
  res.json(transactions);
});

app.post('/transactions', async (req, res) => {
  const { text, amount, type } = req.body;
  const transaction = new Transaction({ text, amount, type });
  await transaction.save();

  let balance = await Balance.findOne();
  if (!balance) balance = new Balance({ amount: 0 });
  balance.amount += type === 'credit' ? parseFloat(amount) : -parseFloat(amount);
  await balance.save();

  res.json(transaction);
});

app.delete('/transactions/:id', async (req, res) => {
  const tx = await Transaction.findByIdAndDelete(req.params.id);
  if (tx) {
    let balance = await Balance.findOne();
    balance.amount += tx.type === 'credit' ? -tx.amount : +tx.amount;
    await balance.save();
  }
  res.json({ success: true });
});

app.put('/transactions/:id', async (req, res) => {
  const { text, amount, type } = req.body;
  const existing = await Transaction.findById(req.params.id);

  let balance = await Balance.findOne();
  if (existing) {
    // Undo old transaction
    balance.amount += existing.type === 'credit' ? -existing.amount : +existing.amount;

    // Apply new one
    existing.text = text;
    existing.amount = amount;
    existing.type = type;
    await existing.save();

    balance.amount += type === 'credit' ? +amount : -amount;
    await balance.save();
    res.json(existing);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
