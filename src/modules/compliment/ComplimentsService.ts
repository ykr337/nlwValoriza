import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "./ComplimentsRepository";
import { UserRepository } from "../user/UserRepository";

interface ComplimentInput {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class ComplimentsService {
  async execute({
    message,
    tag_id,
    user_receiver,
    user_sender,
  }: ComplimentInput) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const userRepository = getCustomRepository(UserRepository);

    const isReceiverValid = await userRepository.findOne(user_receiver);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect User Receiver");
    }

    if (!isReceiverValid) {
      throw new Error("User Receiver does not exists");
    }
    const compliment = await complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    complimentsRepository.save(compliment);

    return compliment;
  }

  async listComplimentsByUser(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
    });

    console.log(compliments);

    return compliments;
  }

  async listComplimentsFromUser(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepository);
    const compliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id,
      },
    });

    return compliments;
  }
}

export { ComplimentsService };
