import express from "express";

import { registerUser } from "../../controllers/auth/registerUser";
import { loginUser } from "../../controllers/auth/loginUser";
import { refreshUser } from "../../controllers/auth/refreshUser";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshUser);

export default router
