import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const token = authHeader.split(' ')[1]; // expecting "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({ error: 'JWT secret not found' });
    }
    
    const payload = jwt.verify(token, jwtSecret);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    
    req.user = { id: (payload as JwtPayload).id }; 
    next();
  } catch (error: any) {
    console.error('Auth error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
