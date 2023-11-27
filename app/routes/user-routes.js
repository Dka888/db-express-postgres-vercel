import { Router } from "express";
import { allUsers, login, register } from "../controllers/user-controllers.js";

export const router = new Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', allUsers);