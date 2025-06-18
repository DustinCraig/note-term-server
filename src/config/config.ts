import dotenv from "dotenv";

dotenv.config();

export interface Config {
  port: number;
  dbUrl: string;
  env: string;
}

export type StandardResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export default {
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.DATABASE_URL || "",
  env: process.env.NODE_ENV || "development",
} as Config;
