import * as dotenv from "dotenv";
import * as path from "path";
import defaultTo from "lodash/defaultTo.js";
dotenv.config();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
export const ENVIRONMENT = defaultTo(process.env.NODE_ENV, "development");
export const IS_PRODUCTION = ENVIRONMENT === "production";
export const APP_PORT = defaultTo(process.env.APP_PORT, 5000);
export const LOG_DIR = defaultTo(process.env.LOG_DIR, path.resolve(__dirname, "logs"));
export const JWT_SECRET = defaultTo(process.env.JWT_SECRET, "NoCal Sec R22");
export const MONGODB = {
    USER: defaultTo(process.env.DB_USER, "root"),
    PASSWORD: defaultTo(process.env.DB_PASSWORD, "secret"),
    HOST: defaultTo(process.env.DB_HOST, "localhost"),
    NAME: defaultTo(process.env.DB_DATABASE, "test"),
    APPNAME: defaultTo(process.env.DB_APPNAME, "myApp")
};
