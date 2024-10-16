import { IUser } from '../interfaces/IUser';
import logger from '../config/logger';
import User from '../models/user';

export const registerUser = async (username: string, password: string): Promise<IUser | null> => {
    try {
        logger.info("[ registerUserService registerUser() ] is called");
        const existingUser = await User.findOne({ username });
        
        if (existingUser) {
            logger.error(`User already exists: ${username}`);
            return null;
        }
        const newUser: IUser = new User({ username, password }) as IUser;
        await newUser.save();
        logger.info(`User registered: ${username}`);
        return newUser;
    } catch (error) {
        logger.error(`Error while registering user: ${username}`);
        throw error; // Registration failed
    }
};

export const loginUser = async (username: string, password: string): Promise<IUser | null> => {
    try {
        logger.info("[ loginUserService loginUser() ] is called");
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            logger.error(`Failed login attempt for user: ${username}`);
            return null;
        }
        logger.info(`User authenticated successfully: ${username}`);
        return user;
    } catch (error) {
        logger.error(`Error during login for user: ${username}`);
        throw error;
    }
};
