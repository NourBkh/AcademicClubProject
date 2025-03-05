import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from './../models/departement'; 

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

 

  
  private apiUrl = 'http://localhost:8090/Department'; // Adjust the API URL based on your backend configuration

  constructor(private http: HttpClient) {}

  // Method to add a department
  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/add`, department);
  }

  // Method to update a department
  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/update`, department);
  }

  // Method to get a department by ID
  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/get/${id}`);
  }

  // Method to delete a department by ID
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Method to get all departments
  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/all`);
  }

  assignDepartmentToClub(depId: number, clubId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/assignDepToClub/${depId}/${clubId}`, {});
}
   
   }
   
   





