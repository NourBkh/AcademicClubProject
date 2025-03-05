import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { TableService } from 'src/app/shared/services/table.service';
import { Department } from '../../shared/models/departement'; // Assuming you have a Department model
import { DepartmentService } from '../../shared/services/department.service'; // Assuming you have a DepartmentService
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {

  public tableItem$: Observable<Department[]>;
  public searchText: string;
  public total$: Observable<number>;
  public loading: boolean = true; 

  constructor(public service: TableService, private departmentService: DepartmentService, private router: Router) { }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnInit() {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      departments => {
        this.tableItem$ = of(departments);
        this.loading = false;
      },
      error => {
       console.error('Error fetching departments:', error);
       this.loading = false;
      }
    );
  }

  deleteData(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe(
        () => {
          // Filter out the deleted department from the table
          this.tableItem$ = this.tableItem$.pipe(
            map(departments => departments.filter(department => department.idD !== id))
          );
        },
        error => {
          console.error('Error deleting department:', error);
        }
      );
    }
  }
  
  editDepartment(id: number) {
    this.router.navigate(['/department/department-modify', id]);
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
