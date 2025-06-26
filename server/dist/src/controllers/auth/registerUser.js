import bycrypt from "bcrypt";
import { User } from "../../models/User.js";
export const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        const hashedPassword = await bycrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, username });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
