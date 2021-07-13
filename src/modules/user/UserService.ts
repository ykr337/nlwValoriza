import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "./UserRepository";

interface UserInput {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class UserService {
  async execute({ name, email, admin = false, password }: UserInput) {
    const userRepository = getCustomRepository(UserRepository);
    let user = null;
    if (!email) {
      throw new Error("Email invalido");
    }

    console.log(email);
    const userExists = await userRepository.findOne({ email });

    if (!userExists) {
      const hashPassword = await hash(password, 8);

      user = userRepository.create({
        name,
        email,
        admin,
        password: hashPassword,
      });
    } else {
      throw new Error("Usuario já cadastrado");
    }
    await userRepository.save(user);
    return user;
  }

  async listUsers() {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.find();
  }
}

export { UserService };
