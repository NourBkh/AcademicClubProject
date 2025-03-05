import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "simple-page",
    loadChildren: () => import("../../components/simple-page/simple-page.module").then((m) => m.SimplePageModule),
  },
  {
    path: "single-page",
    loadChildren: () => import("../../components/single-page/single-page.module").then((m) => m.SinglePageModule),
  },
  {
    path: "tasks",
    loadChildren: () => import("../../components/apps/tasks/tasks.module").then((m) => m.TasksModule),
  },
 
  {
    path: "club",
    loadChildren: () => import("../../club/club.module").then((m) => m.ClubModule),
  },
  {
    path: "department",
    loadChildren: () => import("../../department/department.module").then((m) => m.DepartmentModule),
  },
];
