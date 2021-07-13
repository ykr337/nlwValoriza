import { Router } from "express";
import { AuthenticateUserController } from "./modules/auth/AuthenticateUserController";
import { ComplimentController } from "./modules/compliment/ComplimentController";
import { ensureAdmin } from "./modules/utils/middleware/EnsureAdmin";
import { ensureAuthenticated } from "./modules/utils/middleware/EnsureAuthenticated";
import { TagController } from "./modules/tag/TagController";
import { UserController } from "./modules/user/UserController";

const router = Router();

const userController = new UserController();
const tagController = new TagController();
const authController = new AuthenticateUserController();
const complimentController = new ComplimentController();

router.post("/users", userController.createUser);

router.get("/users", userController.listUsers);

router.post("/tags", ensureAuthenticated, ensureAdmin, tagController.handle);

router.get("/tags", tagController.listTags);

router.post("/login", authController.handle);

router.post("/compliments", ensureAuthenticated, complimentController.handle);

router.get(
  "/user/compliments/send",
  ensureAuthenticated,
  complimentController.handleListComplimentsFromUser
);

router.get(
  "/user/compliments/received",
  ensureAuthenticated,
  complimentController.handleListComplimentsByUser
);

export { router };
