import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

interface UserInput {
  name: string;
  email: string;
  admin?: boolean;
}

class UserService {
  async execute({ name, email, admin }: UserInput) {
    const userRepository = getCustomRepository(UserRepository);
    let user = null;
    if (!email) {
      throw new Error("Email invalido");
    }

    console.log(email);
    const userExists = await userRepository.findOne({ email });

    if (!userExists) {
      console.log(userExists);
      user = userRepository.create({
        name,
        email,
        admin,
      });
    } else {
      throw new Error("Usuario já cadastrado");
    }
    await userRepository.save(user);
    return user;
  }
}

export { UserService };
