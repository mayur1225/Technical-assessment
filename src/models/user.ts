import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import logger from '../config/logger';
import { IUser } from '../interfaces/IUser';

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre<IUserModel>('save', async function (next) {
    if (!this.isModified('password'))
    return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    logger.info(`Password hashed for user: ${this.username}`);
    next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUserModel>('User', UserSchema);
