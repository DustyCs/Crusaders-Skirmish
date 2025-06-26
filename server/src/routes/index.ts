import { Router } from 'express';
import authRouter from './auth/auth.js';

const router: Router = Router();

router.use('/auth', authRouter);

export const MainRouter : Router = router;