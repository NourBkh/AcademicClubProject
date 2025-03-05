import { Club } from "./club";
import { Interview } from "./interview";

export class Department {
    idD: number;
    nameD: string;
    description: string;
    memberCount: number;
    club: Club;
    interviews: Interview[];
}