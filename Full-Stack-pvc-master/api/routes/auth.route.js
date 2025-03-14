import express from "express";
import { google, signgin, signup } from "../controllers/auth.controller.js";


const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.post("/google", google);

export default route;
