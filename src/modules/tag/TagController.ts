import { Request, Response } from "express";
import { TagService } from "./TagService";

class TagController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;
    const service = new TagService();
    const tag = await service.execute(name);
    return response.json(tag);
  }

  async listTags(request: Request, response: Response) {
    const service = new TagService();
    const tags = await service.listTags();
    return response.json(tags);
  }
}

export { TagController };
