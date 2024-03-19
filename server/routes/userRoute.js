import express from "express";
import { register, login , addstudent , getstudent } from "../controller/authController.js";



const router = express.Router();

router.post("/login",  login);
router.post("/register",  register);
router.post("/addStudent", addstudent );
router.get("/getStudent",getstudent);


export default router;