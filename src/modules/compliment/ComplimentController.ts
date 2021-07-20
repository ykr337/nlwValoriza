import { Request, response, Response } from "express";
import { ComplimentsService } from "./ComplimentsService";

class ComplimentController {
  async handle(req: Request, res: Response) {
    const { message, tag_id, user_receiver } = req.body;
    const user_sender = req.user_id;
    const complimentService = new ComplimentsService();

    const compliment = await complimentService.execute({
      message,
      tag_id,
      user_receiver,
      user_sender,
    });

    res.json(compliment);
  }

  async handleListComplimentsByUser(req: Request, res: Response) {
    console.log("deu ruim");
    const user_id = req.user_id;
    const complimentService = new ComplimentsService();

    const compliments = await complimentService.listComplimentsByUser(user_id);

    return res.json(compliments);
  }

  async handleListComplimentsFromUser(req: Request, res: Response) {
    console.log("deu ruim");
    const user_id = req.user_id;
    const complimentService = new ComplimentsService();

    const compliments = await complimentService.listComplimentsFromUser(
      user_id
    );
    console.log(compliments);
    return res.json(compliments);
  }
}

export { ComplimentController };
