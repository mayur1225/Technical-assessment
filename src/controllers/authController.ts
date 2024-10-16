import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import logger from '../config/logger';

// Register User Controller
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        logger.info("[ registerUserController register() ] is called");
        const newUser = await registerUser(username, password);

        if (!newUser) {
            logger.warn(`User already exists: ${username}`);
            res.status(400).json({ error: 'User already exists' });
            return;
        }
        logger.info(`User registered successfully: ${username}`);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        logger.error(`Error during registration`);
        res.status(500).json({ error: 'Server error' });
    }
};

// Login User Controller
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        logger.info("[ loginUserController login() ] is called");
        const user = await loginUser(username, password);

        if (!user) {
            logger.warn(`Invalid login attempt for user: ${username}`);
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        logger.info(`User logged in successfully: ${username}`);
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        logger.error(`Error during login`);
        res.status(500).json({ error: 'Server error' });
    }
};
