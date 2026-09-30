import express from "express";
import { userController, userloginController } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/", userloginController);
router.post("/login", userController);




export default router;