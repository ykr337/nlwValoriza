import { Repository } from "typeorm";
import { Compliments } from "../entities/Compliments";

class ComplimentsRepository extends Repository<Compliments> {}

export { ComplimentsRepository };
