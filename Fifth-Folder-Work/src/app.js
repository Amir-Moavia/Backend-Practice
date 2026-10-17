import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// this is for form data like the clint can send data only upto 16 kb

app.use(express.json(
    {
        limit: "16kb",
    }
));

// this is for req form url
app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}));

// to temp store the client data on the server     it will be public
app.use(express.static("public")); // this basically refers to the 
// public folder in which we will temp store data like pics or another doc


app.use(cookieParser());

export { app };