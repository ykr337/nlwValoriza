import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ComplimentController } from "./controllers/ComplimentController";
import { TagController } from "./controllers/TagController";
import { UserController } from "./controllers/UserController";
import { ensureAdmin } from "./middleware/EnsureAdmin";

const router = Router();

const userController = new UserController();
const tagController = new TagController();
const authController = new AuthenticateUserController();
const complimentController = new ComplimentController();

router.post("/users", userController.createUser);

router.post("/tags", ensureAdmin, tagController.handle);

router.post("/login", authController.handle);

router.post("/compliments", complimentController.handle);

export { router };
