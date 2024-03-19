import express from "express";
import {postAttendance , employerattendance , getStudents} from "../controller/attendance.js";


const router = express.Router();

router.post("/postattendance", postAttendance);
router.get("/getstudents",  getStudents);

router.post("/getattendance",  employerattendance);



export default router;
