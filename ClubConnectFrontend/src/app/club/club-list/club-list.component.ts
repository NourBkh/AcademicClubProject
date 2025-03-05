import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { TableService } from 'src/app/shared/services/table.service';
import { Club } from '../../shared/models/club';
import { ClubService } from '../../shared/services/club.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit {

  public tableItem$: Observable<Club[]>; 
  public searchText: string;
  public total$: Observable<number>;
  public loading: boolean = true; 

  constructor(public service: TableService, private clubService: ClubService, private router: Router) { }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnInit() {
    this.getAllClubs();
  }

  getAllClubs() {
    this.clubService.getAllClubs().subscribe(
      clubs => {
        this.tableItem$ = of(clubs);
        this.loading = false;
      },
      error => {
        console.error('Error fetching clubs:', error);
        this.loading = false;
      }
    );
  }
  

  
  deleteData(id: number) {
    if (confirm('Are you sure you want to delete this club?')) {
      this.clubService.deleteClub(id).subscribe(
        () => {
          // Filter out the deleted club from the table
          this.tableItem$ = this.tableItem$.pipe(
            map(clubs => clubs.filter(club => club.idC !== id))
          );
        },
        error => {
          console.error('Error deleting club:', error);
        }
      );
    }
  }
  
  

  // deleteData(id: number) {
  //   this.tableItem$.subscribe((data: Club[]) => {
  //     const index = data.findIndex(club => club.idC === id);
  //     if (index !== -1) {
  //       data.splice(index, 1);
  //     }
  //   });
  // }
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

  navigateToClubDetails(clubId: number) {
    this.router.navigate(['/club/club-details', clubId]); // Assuming your route for club details is '/club-details/:id'
  }
  

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
