import { Request, Response } from "express";
import { AuthenticateUserService } from "./AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticationService = new AuthenticateUserService();

    const token = await authenticationService.execute({ email, password });

    return res.json(token);
  }
}

export { AuthenticateUserController };
