import { Club } from "./club";
import { Role } from "./role";
import { Reclamation } from "./reclamation";

export class User {
    idU: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    pseudoname: string;
    role: Role;
    reclamations: Reclamation[];
    clubs: Club[];
}
