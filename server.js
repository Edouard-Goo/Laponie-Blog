import express from "express";
import { connectDB } from "./config/database.js";
import PostsRouter from "./routes/PostsRouter.js";
import session from "express-session";
import userRouter from "./routes/UserRouter.js";

const app = express();

connectDB

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// Initialisation de la session
app.use(session({
    name: "user",
    secret: "my_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3_600_000 // 1000 * 60 * 60 // 1 Heure
    }
}))

// Mon router
app.use(PostsRouter)
app.use(userRouter)

app.listen(7000, ()=>{
    console.log("Le serveur est exécuté: http://localhost:7000")
})