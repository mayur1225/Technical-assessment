import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';


const app: Application = express();
dotenv.config();

// Configure CORS options
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  };

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



export default app;
