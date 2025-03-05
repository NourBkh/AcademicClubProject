import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categ } from 'src/app/shared/models/categ';
import { Club } from 'src/app/shared/models/club';
import { ClubService } from 'src/app/shared/services/club.service';

@Component({
  selector: 'app-club-modify',
  templateUrl: './club-modify.component.html',
  styleUrls: ['./club-modify.component.scss']
})
export class ClubModifyComponent implements OnInit{
  public selectedFile: File = new File([], '');
  updateForm: FormGroup;
  id: number;
  updatedClub: Club = new Club();
  public CategValues = Object.values(Categ);
  public validate = false;
  public tooltipValidation = false;

  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
      nameC: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categorie: new FormControl('', [Validators.required]),
      logo: new FormControl(''), // Remove Validators.required for file input
      websiteURL: new FormControl('', [Validators.required])
    });
  }

  get nameC() {
    return this.updateForm.get('nameC');
  }
  get description() {
    return this.updateForm.get('description');
  }
  get categorie() {
    return this.updateForm.get('categorie');
  }
  get logo() {
    return this.updateForm.get('logo');
  }
  get websiteURL() {
    return this.updateForm.get('websiteURL');
  }

  ngOnInit(): void {
    let idClub = this.router.snapshot.params['id'];
    this.id = idClub;

    this.clubService.getClubById(idClub).subscribe((club) => {
      this.updatedClub = club;
      this.updateForm.patchValue({
        nameC: club.nameC,
        description: club.description,
        categorie: club.categorie,
        websiteURL: club.websiteURL,
      });
    });
  }

  updateClub(id: number, name: string, description: string, imageFile: File): void {
    this.clubService.updateClub(id, name, description, imageFile).subscribe(
      (response) => {
        console.log('Club updated successfully:', response);
        this.route.navigate(['/club/club-list']);
      },
      (error) => {
        console.error('Error updating the club:', error);
        // Handle error, show error message, etc.
      }
    );
  }
  onFileSelected(event: any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;

      this.updateForm.patchValue({
        logo: file
      });

      this.updateForm.get('logo').updateValueAndValidity();
    }
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  resetForm(): void {
    this.updatedClub = new Club();
    
    this.selectedFile = new File([], '');
  }

  submit() {
    this.validate = !this.validate;
    this.updateClub(this.id, this.updateForm.value.nameC, this.updateForm.value.description, this.selectedFile);
  }

  tooltipSubmit() {
    this.tooltipValidation = !this.tooltipValidation;
  }
}