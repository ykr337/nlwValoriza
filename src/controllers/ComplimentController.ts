import { Request, Response } from "express";
import { ComplimentsService } from "../service/ComplimentsService";

class ComplimentController {
  async handle(req: Request, res: Response) {
    const { message, tag_id, user_receiver, user_sender } = req.body;

    const complimentService = new ComplimentsService();

    const compliment = await complimentService.execute({
      message,
      tag_id,
      user_receiver,
      user_sender,
    });

    res.json(compliment);
  }
}

export { ComplimentController };
