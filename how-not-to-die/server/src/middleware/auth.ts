//file path: HowNotToDieDemo/how-not-to-die/server/src/middleware/auth.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables.');
}

// Generate a token
export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: number };
    (req as any).user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};
