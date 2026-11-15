
import express, { Application } from "express";
import router from "./routes";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

const app : Application= express();

// cors setup
app.use(cors({
    origin: process.env.APP_URL,
    credentials: true,
}))
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use('/api/v1', router);

app.get("/", (req, res) => {
    res.send("Welcome to the Blog Application API");
});

export default app;