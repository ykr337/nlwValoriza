import { Request, Response } from "express";
import { TagService } from "../service/TagService";

class TagController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;
    const service = new TagService();
    const tag = await service.execute(name);
    return response.json(tag);
  }
}

export { TagController };
