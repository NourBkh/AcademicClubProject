import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { DepartmentModifyComponent } from './department-modify/department-modify.component';

const routes: Routes = [

  {
    path: "",
    children: [
      {
        path: "department-list",
        component: DepartmentListComponent,
      },
      {
        path: "department-add",
        component: DepartmentAddComponent,
      },
      {
        path: "department-modify/:id",
        component: DepartmentModifyComponent,
      },
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
