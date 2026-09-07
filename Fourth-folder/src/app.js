import express from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: '16kb'})); // this is for defensive measures like to stop someone from being sending the 5 gb request data so the server may crash or consume server resources.

app.use(express.urlencoded({extended: true, limit: '16kb'})); // controls how complex URL-encoded data is parsed.

app.use(express.static('public'));

app.use(cookieParser()); 


export { app };