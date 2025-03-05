import { Component, OnInit } from '@angular/core';
import { Categ } from '../../shared/models/categ';
import { Club } from '../../shared/models/club';
import { ClubService } from '../../shared/services/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-add',
  templateUrl: './club-add.component.html',
  styleUrls: ['./club-add.component.scss'],
})
export class ClubAddComponent implements OnInit {
  public newClub: Club = new Club();
  public CategValues = Object.values(Categ);
  public agreeTerms = false;
  public selectedFile: File = new File([], '');
  public validate = false;

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit(): void {
    if (this.agreeTerms && this.selectedFile) {
      const clubData = new FormData();
      clubData.append('nameC', this.newClub.nameC);
      clubData.append('description', this.newClub.description);
      clubData.append('creationDate', this.formatDate(new Date()));
      clubData.append('categorie', this.newClub.categorie);
      clubData.append('websiteURL', this.newClub.websiteURL);
      clubData.append('logo', '');
      clubData.append('imageFile', this.selectedFile);

      this.clubService.addClub(clubData).subscribe(() => {
        // Handle the response as needed
      });
    }
  }

  resetForm(): void {
    this.newClub = new Club();
    this.agreeTerms = false;
    this.selectedFile = new File([], '');
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
}
