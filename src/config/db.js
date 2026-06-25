import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not defined in your .env file!");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter: adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

export const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfully via Prisma");
  } catch (error) {
    console.error(`Error Connecting to Database via Prisma: ${error.message}`);
    process.exit(1);
  }
};

export const disconnectDb = async () => {
  await prisma.$disconnect();
  await pool.end();
};