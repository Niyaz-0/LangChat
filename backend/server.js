import express from "express";
import 'dotenv/config' 
import authRouter from "./routes/auth.routes.js";
import { connectDb } from "./lib/connectDb.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(cookieParser())

const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? "https://langchat-zhwz.onrender.com"  
    : "http://localhost:5173",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/chats', chatRouter)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join( __dirname, "../frontend/dist" )))

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

app.listen(PORT, () => {
    connectDb()
    console.log(`Server listening on PORT ${PORT}...`);
});
