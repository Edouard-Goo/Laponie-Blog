import express from "express";
import { LoginPage, LoginSubmit, Logout, RegisterPage, RegisterSubmit } from "../controllers/user.js";

const userRouter = express.Router();

// Page GET AFFICHE LE FORMULAIRE DE CONNEXION
userRouter.get("/login", LoginPage)

// TRAITEMENT DU FORMULAIRE DE CONNEXION
userRouter.post("/login", LoginSubmit)

// AFFICHAGE DU FORMULAIRE D'INSCRIPTION
userRouter.get("/register", RegisterPage)

// TRAITEMENT DU FORMULAIRE D'INSCRIPTION
userRouter.post("/register", RegisterSubmit)

// DECONNEXION
userRouter.get("/logout", Logout)


export default userRouter