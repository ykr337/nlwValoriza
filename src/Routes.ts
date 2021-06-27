import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ComplimentController } from "./controllers/ComplimentController";
import { TagController } from "./controllers/TagController";
import { UserController } from "./controllers/UserController";
import { ensureAdmin } from "./middleware/EnsureAdmin";
import { ensureAuthenticated } from "./middleware/EnsureAuthenticated";

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
