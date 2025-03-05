import { Routes } from '@angular/router';

export const full: Routes = [

    {
        path: 'authentication',
        loadChildren: () => import('../../pages/authentication/authentication.module').then(m => m.AuthenticationModule),
      },
      {
        path: "department",
        loadChildren: () => import("../../department/department.module").then((m) => m.DepartmentModule),
      },
      {
        path: "club",
        loadChildren: () => import("../../club/club.module").then((m) => m.ClubModule),
      },
  
];
