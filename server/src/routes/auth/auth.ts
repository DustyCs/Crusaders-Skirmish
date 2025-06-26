import express from "express";

import { registerUser } from "../../controllers/auth/registerUser.js";
import { loginUser } from "../../controllers/auth/loginUser.js";
import { refreshUser } from "../../controllers/auth/refreshUser.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshUser);

export default router
