import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from './../models/club'; 
import { Prediction } from './../models/prediction'; 
import { map } from 'rxjs/operators';
//import { PredictionData } from 'src/app/club/project-prediction/prediction-data.interface';



@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) {}

   
     private baseUrl = 'http://localhost:8090/Club'; // Adjust the base URL as per your Spring Boot application
     private apiUrl = 'http://localhost:8090/Club/addClub';
     private apiUrl2 = 'http://localhost:8090/Club/updateClub';
    
   
     addClub(clubData: FormData): Observable<any> {
      return this.http.post<any>(this.apiUrl, clubData);
    }

  
    
    //  addClub(club: Club, logoFile: File): Observable<Club> {
    //   const formData = new FormData();
      
    //   Object.keys(club).forEach(key => {
    //     formData.append(key, club[key]);
    //   });
  
    //   if (logoFile) {
    //     formData.append('logo', logoFile, logoFile.name);
    //   }
  
    //   return this.http.post<Club>(`${this.baseUrl}/add`, formData);
    // }
  


  /*  updateClub(clubData: FormData): Observable<any> {
      return this.http.post<any>(this.apiUrl2, clubData);
    }*/

    /*updateClub(updatedClub: Club): Observable<any> {
      const clubData = new FormData();
      clubData.append('idC', updatedClub.idC.toString());
      clubData.append('nameC', updatedClub.nameC);
      clubData.append('description', updatedClub.description);
      clubData.append('creationDate', updatedClub.creationDate.toString());
      clubData.append('categorie', updatedClub.categorie);
      clubData.append('logo', updatedClub.logo);
      clubData.append('websiteURL', updatedClub.websiteURL);
  
      // Add any additional fields as needed
  
      return this.http.post<any>(this.apiUrl2, clubData);
    }*/
    updateClub(id: number, name: string, description: string, imageFile: File): Observable<string> {
      const formData: FormData = new FormData();
      formData.append('idC', id.toString());
      formData.append('nameC', name);
      formData.append('description', description);
      formData.append('imageFile', imageFile, imageFile.name);
  
      return this.http.put<string>(`${this.baseUrl}/updateClub`, formData);
    }

   
     /*updateClub(club: Club): Observable<Club> {
       return this.http.put<Club>(`${this.baseUrl}/update`, club);
     }*/
    getClubById(numclub: number)
    : Observable<Club> {
       return this.http.get<Club>(`${this.baseUrl}/get/${numclub}`);
     }
   
     deleteClub(numclub: number): Observable<void> {
       return this.http.delete<void>(`${this.baseUrl}/delete/${numclub}`);
     }
   
     getAllClubs(): Observable<Club[]> {
       return this.http.get<Club[]>(`${this.baseUrl}/all`);
     }

  /*   getAllClubsWithConvertedLogos(): Observable<Club[]> {
      return this.http.get<Club[]>(`${this.baseUrl}/all`).pipe(
        map(clubs => {
          return clubs.map(club => {
            const clubWithLogoData = { ...club };
            clubWithLogoData.logo = `data:image/png;base64, ${club.logo}`; // Assuming logo data is base64 encoded
            return clubWithLogoData;
          });
        })
      );
    }*/

     assignDepartmentToClub(depId: number, clubId: number): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/assignDepToClub/${depId}/${clubId}`, {});
  }

  generateQRCodeForClubWebsite(clubId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/generateQRCode/${clubId}`);
  }
  
     
   
   

   getNumberOfDepartmentsPerClub(clubId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/departments/count/${clubId}`);
  }

  getNumberOfEventsPerClub(clubId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/events/count/${clubId}`);
  }
   
  /*predictProjectsAndFundsInPeriod(clubId: number, periodInMonths: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${clubId}/predict?periodInMonths=${periodInMonths}`);
  }*/
  /*predictProjectsAndFundsInPeriod(clubId: number, periodInMonths: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/predict/${clubId}/${periodInMonths}`);
  }*/
  

  /*predictProjectsAndFundsInPeriod(clubId: number, periodInMonths: number): Observable<PredictionData[]> {
    return this.http.get<PredictionData[]>(`${this.baseUrl}/${clubId}/predict?periodInMonths=${periodInMonths}`);
  }*/

  
  predictProjectsAndFunds(clubId: number, periodInMonths: number): Observable<Prediction[]> {
    return this.http.post<Prediction[]>(`${this.baseUrl}/predict?clubId=${clubId}&periodInMonths=${periodInMonths}`, {});
  }

  analyzeAttendanceAndPredictAttrition(clubId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/analyze-attendance-and-predict-attrition/${clubId}`, {});
  }
  
 

  getNumberOfUsersPerClub(clubId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/users/count/${clubId}`);
  }

 


}


