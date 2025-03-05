import { Component, OnInit } from '@angular/core';
import { Department } from '../../shared/models/departement';
import { DepartmentService } from '../../shared/services/department.service';
import { Router } from '@angular/router';
import { ClubService } from '../../shared/services/club.service';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit {
 
  public validate = false;
  public tooltipValidation = false;
  public newDepartment: Department = {
    idD: 0,
    nameD: "",
    description: "",
    memberCount: 0,
    club: null,
    interviews: []
  };
  // Assuming CategValues are not required for Department
  public agreeTerms = false; // Added for checkbox validation
  clubId: number;
  depId: number;
  
  constructor(private departmentService: DepartmentService,  private router: Router, private clubService: ClubService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.clubId = params['clubId'];
    });
  }

  public submit() {
    if (this.agreeTerms) { 
      // Start department ID from 1
      this.departmentService.addDepartment(this.newDepartment).subscribe(
        (department) => {
          // Successfully added department, now assign department to club
          this.departmentService.assignDepartmentToClub(department.idD, this.clubId).subscribe(
            () => {
              // Successfully assigned department to club
              console.log('Department added and assigned to club successfully:', department);
              this.resetForm();
              this.router.navigate(['/department/department-list']);
             // this.sendNotification('New Department Added', `A new department '${department.nameD}' was added.`);
            },
            (error) => {
              // Handle error assigning department to club
              console.error('Error assigning department to club:', error);
              // Optionally, you can show error messages to the user
            }
          );
        },
        (error) => {
          // Handle error adding department
          console.error('Error adding department:', error);
          // Optionally, you can show error messages to the user
        }
      );
    } else {
      console.error('Please agree to terms and conditions');
      // Optionally, you can show a message to the user to agree to terms and conditions
    }
  }
  
 /* private sendNotification(title: string, body: string) {
    this.afMessaging.requestPermission
      .toPromise()
      .then(() => {
        return this.afMessaging.requestToken;
      })
      .then((token) => {
        this.afMessaging.messages.next({
          notification: {
            title: title,
            body: body,
          },
          token: token,
        });
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
      });}*/
  
  

  private resetForm() {
    this.newDepartment = {
      idD: 0,
      nameD: "",
      description: "",
      memberCount: 0,
      club: null,
      interviews: []
    };
    this.agreeTerms = false; // Reset checkbox
  }

  public tooltipSubmit() {
    this.tooltipValidation = !this.tooltipValidation;
  }

}
