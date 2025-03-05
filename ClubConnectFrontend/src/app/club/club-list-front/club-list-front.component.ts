import { Component, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, of } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { Club } from 'src/app/shared/models/club';
import { ClubService } from 'src/app/shared/services/club.service';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-club-list-front',
  templateUrl: './club-list-front.component.html',
  styleUrls: ['./club-list-front.component.scss']
})
export class ClubListFrontComponent {

  public tableItem$: Observable<Club[]>; 
  public searchText: string;
  public total$: Observable<number>;
  public loading: boolean = true; 

  constructor(public service: TableService, private clubService: ClubService, private router: Router,private modalService: NgbModal) { }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnInit() {
    this.getAllClubs();
    setTimeout(() => {
      //feather.replace();
    });
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



  /*function filterClubsByCategory(category: string): Club[] {
    return this.clubs.filter(club => {
      return club.category.toLowerCase().includes(category.toLowerCase());
    });
  
   }*/
  
  























































































































































































  @Input("icon") public icon;
  @Output() productDetail: any;

 // public listData = data.product;
  openSidebar: boolean = false;
  OpenFilter: Boolean = false;

  sidebaron: boolean = false;
  show: boolean = false;
  open: boolean = false;
  public listView: boolean = false;
  public col_xl_12: boolean = false;
  public col_xl_2: boolean = false;

  public col_sm_3: boolean = false;
  public col_xl_3: boolean = true;
  public xl_4: boolean = true;
  public col_sm_4: boolean = false;
  public col_xl_4: boolean = false;
  public col_sm_6: boolean = true;
  public col_xl_6: boolean = false;
  public gridOptions: boolean = true;
  public active: boolean = false;

  //@ViewChild("quickView") QuickView: QuickViewComponent;

  toggleListView(val) {
    this.listView = val;
  }

  sidebarToggle() {
    this.openSidebar = !this.openSidebar;
  }
  openFilter() {
    this.OpenFilter = !this.OpenFilter;
  }

  gridOpens() {
    this.listView = false;
    this.gridOptions = true;
    this.listView = false;
    this.col_xl_3 = true;

    this.xl_4 = true;
    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = false;
    this.col_sm_6 = true;

    this.col_xl_2 = false;
    this.col_xl_12 = false;
  }
  listOpens() {
    this.listView = true;
    this.gridOptions = false;
    this.listView = true;
    this.col_xl_3 = true;
    this.xl_4 = true;
    this.col_xl_12 = true;
    this.col_xl_2 = false;

    this.col_xl_4 = false;
    this.col_sm_4 = false;
    this.col_xl_6 = false;
    this.col_sm_6 = true;
  }
  grid2s() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = false;

    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = true;
    this.col_sm_6 = true;

    this.col_xl_12 = false;
  }
  grid3s() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = false;
    this.col_xl_4 = true;
    this.col_sm_4 = true;

    this.col_xl_6 = false;
    this.col_sm_6 = false;

    this.col_xl_12 = false;
  }
  grid6s() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = true;
    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = false;
    this.col_sm_6 = false;

    this.col_xl_12 = false;
  }

  openProductDetail(content: any, item: any) {
    this.modalService.open(content, { centered: true, size: "lg" });
    this.productDetail = item;
  }

  ngDoCheck() {
    this.col_xl_12 = this.col_xl_12;
    this.col_xl_2 = this.col_xl_2;
    this.col_sm_3 = this.col_xl_12;
    this.col_xl_3 = this.col_xl_3;
    this.xl_4 = this.xl_4;
    this.col_sm_4 = this.col_sm_4;
    this.col_xl_4 = this.col_xl_4;
    this.col_sm_6 = this.col_sm_6;
    this.col_xl_6 = this.col_xl_6;
  }





}
