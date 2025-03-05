import { Component, OnInit  } from '@angular/core';
import { ClubService } from '../../shared/services/club.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Club } from 'src/app/shared/models/club';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.scss']
})
export class ClubDetailsComponent implements OnInit{
 
  club: Club;
  qrCodeImage: string = ''; // Declare the qrCodeImage property with an initial empty string
  qrCodeData: string = '';

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const clubId = Number(params.get('clubId'));

      this.clubService.getClubById(clubId).subscribe((club: Club) => {
        this.club = club;

        this.generateQRCodeForClubWebsite(clubId).subscribe((data: any) => {
          if (data) {
            this.qrCodeData = data;
          }
        });
      });
    });
  }

  generateQRCodeForClubWebsite(clubId: number) {
    return this.http.get('http://localhost:8090/Club/generateQRCode/' + clubId, {
      responseType: 'text'
    });
  }

  listClub() {
    
    this.router.navigate(['/club/club-list']);
  }



  
  deleteData(clubId: number): void {
    if (confirm('Are you sure you want to delete this club?')) {
      this.clubService.deleteClub(clubId).subscribe(() => {
        // Perform any additional actions after deletion (e.g., redirecting to another page)
        this.router.navigate(['/club/club-list-front']); // Redirect to the clubs page after deletion
      });
    }
  }


  
  


  editClub(id: number) {
    
    this.router.navigate(['/club/club-modify', id]);
  }



  analyze(id: number) {
    
    this.router.navigate(['/club/members-analyze', id]);
  }

  promptForPrediction(id: number) {
    const periodInMonths = prompt('Enter the month number:'); // Prompt user for month number
    if (periodInMonths) {
      this.router.navigate(['/club/project-prediction', id, periodInMonths]); // Navigate to prediction page with club id and month number
    }
  }



}