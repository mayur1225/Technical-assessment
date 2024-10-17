import { describe, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('User Authentication', () => {
    beforeAll(async () => {
        const mongoUri = process.env.MONGO_URI;
        if (typeof mongoUri === 'string') {
            await mongoose.connect(mongoUri);
        } else {
            throw new Error('MONGO_URI is not defined');
        }
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it('should register a new user', (done) => {
        request(app)
            .post('/auth/register')
            .send({ username: 'mayur.patel', password: 'Mayur@2024' })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).toBe('User registered successfully');
                done();
            });
    });

    it('should login the user with correct credentials', (done) => {
        request(app)
            .post('/auth/login')
            .send({ username: 'mayur.patel', password: 'Mayur@2024' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should not login the user with incorrect credentials', (done) => {
        request(app)
            .post('/auth/login')
            .send({ username: 'mayur.patel', password: 'Mayur@2023' })
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.error).toBe('Invalid credentials');
                done();
            });
    });
});
