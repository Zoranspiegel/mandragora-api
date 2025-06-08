import { cleanEnv, str, num } from "envalid";
import dotenv from 'dotenv';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: num(),
  DATABASE_URL: str(),
  HARDCODED_USER_NAME: str()
});

export default env;
