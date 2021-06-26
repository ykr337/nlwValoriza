import { Request, Response } from "express";
import { UserService } from "../service/UserService";

class UserController {
  async createUser(req: Request, res: Response) {
    console.log(req.body);
    const { email, name, admin } = req.body;
    const userService = new UserService();

    const user = await userService.execute({ name, email, admin });

    return res.status(201).json(user);
  }
}

export { UserController };
