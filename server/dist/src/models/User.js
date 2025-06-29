import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    }
});
export const User = mongoose.model('User', userSchema);
