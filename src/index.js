import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});