import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubAddComponent } from './club-add/club-add.component';
import { ClubModifyComponent } from './club-modify/club-modify.component';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { ClubListFrontComponent } from './club-list-front/club-list-front.component';
import { ProjectPredictionComponent } from './project-prediction/project-prediction.component';
import { MembersAnalyzeComponent } from './members-analyze/members-analyze.component';
import { ClubStatsComponent } from './club-stats/club-stats.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "club-list",
        component: ClubListComponent,
      },
      {
        path: "club-add",
        component: ClubAddComponent,
      },
      {
        path: "club-modify/:id",
        component: ClubModifyComponent,
      },
      {
        path: "club-details/:clubId",
        component: ClubDetailsComponent,
      },
      {
        path: "club-list-front",
        component: ClubListFrontComponent,
      },
      {
        path: "club-stats/:clubId",
        component: ClubStatsComponent,
      },
      {
        path: "project-prediction/:id/:periodInMonths",
        component: ProjectPredictionComponent,
      },
      {
        path: "members-analyze/:id",
        component: MembersAnalyzeComponent,
      },
   
    ],
  },
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
