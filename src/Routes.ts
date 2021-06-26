import { Router } from "express";
import { TagController } from "./controllers/TagController";
import { UserController } from "./controllers/UserController";
import { ensureAdmin } from "./middleware/EnsureAdmin";

const router = Router();

const userController = new UserController();
const tagController = new TagController();

router.post("/users", userController.createUser);

router.post("/tags", ensureAdmin, tagController.handle);

export { router };
