import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(request.user_id);

  const admin = user.admin;

  if (admin) {
    return next();
  } else {
    response.status(401).json({
      error: "Unauthorized",
    });
  }
}
