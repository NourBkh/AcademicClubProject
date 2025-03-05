import { Categ } from "../models/categ";
import { Department } from "./departement";
import { Training } from "./training";
import { User } from "./user";

export class Club {
   
        nameC: string;
        description: string;
        creationDate: Date | string; // Update to accept both Date and string
        categorie: Categ;
        logo: string;
        websiteURL: string;
        idC: number;
        users: any[];
        departments: any[];
        events: any[];
        trainings: any[];
      
      
}