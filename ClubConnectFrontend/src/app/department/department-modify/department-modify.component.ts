import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../shared/models/departement'; // Assuming you have a Department model
import { DepartmentService } from 'src/app/shared/services/department.service'; // Assuming you have a DepartmentService

@Component({
  selector: 'app-department-modify',
  templateUrl: './department-modify.component.html',
  styleUrls: ['./department-modify.component.scss']
})
export class DepartmentModifyComponent implements OnInit {

  updateForm: FormGroup;
  id: number;
  updatedDepartment: Department = new Department(); // Assuming you have a Department model

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService, // Assuming you have a DepartmentService
    private route: Router,
    private router: ActivatedRoute
  ) {
    // Define form controls and initialize form group
    this.updateForm = this.fb.group({
      nameD: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      memberCount: new FormControl('', [Validators.required]),
      club: this.updatedDepartment.club, 
      interviews: this.updatedDepartment.interviews
    });
  }

  // Getter methods for form controls
  get nameD() { return this.updateForm.get('nameD'); }
  get description() { return this.updateForm.get('description'); }
  get memberCount() { return this.updateForm.get('memberCount'); }
  // Add more getter methods for additional form controls

  ngOnInit(): void {
    // Get department ID from route parameters
    let idDepartment = this.router.snapshot.params['id'];
    this.id = idDepartment;

    // Fetch department data by ID and populate the form
    this.departmentService.getDepartmentById(idDepartment).subscribe((department) => {
      this.updatedDepartment = department;
      this.updateForm.patchValue({
        nameD: department.nameD,
        description: department.description,
        memberCount: department.memberCount
        // Patch values for additional form controls
      });
    });
  }

  updateDepartment() {
    // Get form data
    let data = this.updateForm.value;

    // Create updated department object
    let updatedDepartment: Department = {
      idD: this.id,
      nameD: data.nameD,
      description: data.description,
      memberCount: data.memberCount,
      club: this.updatedDepartment.club, 
      interviews: this.updatedDepartment.interviews    };

    this.departmentService.updateDepartment(updatedDepartment).subscribe((res) => {
      console.log('Department updated successfully:', res);
      this.route.navigate(['/department/department-list']);
    });
  }
}
