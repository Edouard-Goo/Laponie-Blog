
import express from "express"
import { GetHome } from "../controllers/home.js";
import { AddComment, Details } from "../controllers/details.js";
import { AddPost, AddPostSubmit, Admin, DeletePost, EditPost, EditPostSubmit } from "../controllers/admin.js";
import upload from "../middlewares/multer.js";
import { isAdmin, isLogged } from "../middlewares/auth.js";

//appel des controllers

const router = express.Router();

//liste des routes

//HOME PAGE
router.get("/", GetHome)


//ADMIN PAGE
router.get("/admin", isAdmin,Admin)

//ADD POST PAGE
router.get("/admin/add", isAdmin,AddPost)

//ADD POST PAGE SUBMIT
router.post("/admin/add", isAdmin,upload.single("image") ,AddPostSubmit)

//DETAIL PAGE
router.get("/details/:id", Details)

//ADD COMMENTS
router.post("/details/:id",isLogged,AddComment)

//DELETE POST
router.get("/delete/:id", isAdmin,DeletePost)

//EDIT POST
router.get("/edit/:id", isAdmin,EditPost)

//EDIT POST SUBMIT
router.post("/edit/:id", isAdmin,upload.single("image"),EditPostSubmit)



export default router;