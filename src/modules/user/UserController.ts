import { Request, Response } from "express";
import { UserService } from "./UserService";

class UserController {
  async createUser(req: Request, res: Response) {
    console.log(req.body);
    const { email, name, admin, password } = req.body;
    const userService = new UserService();

    const user = await userService.execute({ name, email, admin, password });

    return res.status(201).json(user);
  }

  async listUsers(req: Request, res: Response) {
    const userService = new UserService();

    const users = await userService.listUsers();

    return res.status(201).json(users);
  }
}

export { UserController };
