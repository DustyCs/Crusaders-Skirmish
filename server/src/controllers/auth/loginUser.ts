import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../models/User";
import { Request, Response } from "express";

dotenv.config();

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid email' });
            return;
        }

        const isPasswordValid = await bycrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        const jwtKey = process.env.JWTKEY;
        if (!jwtKey) {
            res.status(500).json({ message: 'JWT key not found' });
            return;
        }

        const jwtRefreshKey = process.env.JWTREFRESHKEY;
        if (!jwtRefreshKey) {
            res.status(500).json({ message: 'JWT refresh key not found' });
            return;
        }

        const accessToken = jwt.sign({ id: user._id }, jwtKey, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id }, jwtRefreshKey, { expiresIn: '7d' });

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}