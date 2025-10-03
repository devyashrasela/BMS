import * as fs from "fs";
import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let sslConfig;
if (process.env.DB_SSL === "true" && process.env.DB_CA_CERT_PATH) {
    sslConfig = {
        ca: fs.readFileSync(path.resolve(__dirname, process.env.DB_CA_CERT_PATH)),
        rejectUnauthorized: true,
    };
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "mysql",
        quoteIdentifiers: true,
        dialectOptions: {
            ssl: sslConfig,
            connectTimeout: 60000,
        },
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

const connectDB = async () => {
    console.log("Database connection attempt...");
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export { sequelize, connectDB };