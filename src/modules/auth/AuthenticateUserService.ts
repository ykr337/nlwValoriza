import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository, getRepository } from "typeorm";
import { Subject } from "typeorm/persistence/Subject";
import { UserRepository } from "../user/UserRepository";

interface AuthInput {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: AuthInput) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user?.password);

    if (!user || !passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign(
      { email: user.email },
      "3306bb6332171a07ddd752e0257ab91b",
      { subject: user.id, expiresIn: "1d" }
    );

    return token;
  }
}

export { AuthenticateUserService };
