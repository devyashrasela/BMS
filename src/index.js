import server, { syncDB } from "./server.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

// Central function to handle startup order
async function startApplication() {
  // 1. Connect to the database first
  await connectDB(); 

  // 2. Sync models to the database
  await syncDB(); 
  
  // 3. Start listening only after DB is ready
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startApplication();
