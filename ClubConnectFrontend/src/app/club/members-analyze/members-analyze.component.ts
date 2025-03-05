import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../shared/services/club.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-members-analyze',
  templateUrl: './members-analyze.component.html',
  styleUrls: ['./members-analyze.component.scss']
})
export class MembersAnalyzeComponent implements OnInit{
  id: number;
  predictedUsersToLeave: any[];
  highlyInvolvedUsers: any[];

  constructor(private clubService: ClubService, private route: Router, private router: ActivatedRoute) {}

  ngOnInit(): void {
    let idClub = this.router.snapshot.params['id'];
    this.id = idClub;
    this.clubService.analyzeAttendanceAndPredictAttrition(idClub).subscribe(
      (data: any) => {
        this.predictedUsersToLeave = data['Users predicted to leave: 2 users'];
        this.highlyInvolvedUsers = data['Highly involved users: 2 users'];

        // Log the retrieved data to the console for debugging
        console.log('Predicted Users to Leave:', this.predictedUsersToLeave);
        console.log('Highly Involved Users:', this.highlyInvolvedUsers);
      }
    );
  }

  public show: boolean = false

  toggle() {
    this.show = this.show
  }
}