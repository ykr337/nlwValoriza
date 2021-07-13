import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }
  const token = authToken.split(" ")[1];

  try {
    const { sub } = verify(
      token,
      "3306bb6332171a07ddd752e0257ab91b"
    ) as Payload;

    request.user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
