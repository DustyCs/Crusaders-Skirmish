import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../models/User.js";
import { Request, Response } from "express";

dotenv.config();

export const refreshUser = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        const jwtRefreshKey = process.env.JWTREFRESHKEY;
        if (!jwtRefreshKey) {
            res.status(500).json({ message: 'JWT refresh key not found' });
            return;
        }

        const payload = jwt.verify(refreshToken, jwtRefreshKey) as { id: string };
        const accessToken = jwt.sign({ id: payload.id }, jwtRefreshKey, { expiresIn: '15m' });

        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid refresh token' });
    }
}