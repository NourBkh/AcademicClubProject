import { Club } from "./club";

export class Training {
    idT: number;
    titleT: string;
    description: string;
    numberPlace: number;
    startDate: Date;
    duration: string;
    location: string;
    affiche: string;
    club: Club;
}