import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import initSocket from './socket/index.js';
import http from 'http';

import { MainRouter } from './routes/index.js';


dotenv.config();

const app = express();

const server = http.createServer(app);
initSocket(server);

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api', MainRouter);

export { app, server };