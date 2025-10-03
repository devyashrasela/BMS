import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js'; 

dotenv.config();

const server = express();

async function syncDB() {
  try {
    console.log("Synchronizing Models")
    await db.sequelize.sync({ force: true }); 
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronise database:", error);
  }
}

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

export { syncDB };
export default server;
