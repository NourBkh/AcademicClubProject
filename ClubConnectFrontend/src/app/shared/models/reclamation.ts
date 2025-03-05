import { TypeR } from "./typeR";
import { User } from "./user";

export class Reclamation {
    idR: number;
    date: string;
    type: TypeR;
    rate: number;
    description: string;
    //user: string;
     user: User;
}