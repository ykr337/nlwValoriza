import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TagRepository } from "./TagRepository";

class TagService {
  async execute(name: string) {
    const repository = getCustomRepository(TagRepository);

    if (!name) {
      throw new Error("Nome inválido");
    }

    const tagExists = await repository.findOne({ name });

    if (tagExists) {
      throw new Error("Esta tag já existe");
    }

    const tag = await repository.create({ name });
    repository.save(tag);

    return tag;
  }

  async listTags() {
    const repository = getCustomRepository(TagRepository);
    const tags = await repository.find();
    return classToPlain(tags);
  }
}
export { TagService };
