import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from 'src/app/shared/services/club.service';

@Component({
  selector: 'app-club-stats',
  templateUrl: './club-stats.component.html',
  styleUrls: ['./club-stats.component.scss']
})
export class ClubStatsComponent implements OnInit {
  numberOfDepartments: number;
  numberOfUsers: number;
  numberOfEvents: number;

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private http: HttpClient,
    private router: Router // Inject ClubService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const clubId = Number(params.get('clubId'));

      this.clubService.getClubById(clubId).subscribe(club => {
        const actualClubId = club.idC; // Assuming club object has an id property named 'idC'

        this.clubService.getNumberOfDepartmentsPerClub(actualClubId).subscribe(data => {
          this.numberOfDepartments = data;
        });

        this.clubService.getNumberOfUsersPerClub(actualClubId).subscribe(data => {
          this.numberOfUsers = data;
        });

        this.clubService.getNumberOfEventsPerClub(actualClubId).subscribe(data => {
          this.numberOfEvents = data;
        });
      });
    });
  }
}
