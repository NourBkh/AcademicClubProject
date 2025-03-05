import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubAddComponent } from './club-add/club-add.component';
import { ClubModifyComponent } from './club-modify/club-modify.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgToastModule,  } from 'ng-angular-popup';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { ClubListFrontComponent } from './club-list-front/club-list-front.component';
import { ProjectPredictionComponent } from './project-prediction/project-prediction.component';
import { ObjectToArrayPipe } from 'src/app/club/project-prediction/object-to-array.pipe';
import { MembersAnalyzeComponent } from './members-analyze/members-analyze.component';
import { ClubStatsComponent } from './club-stats/club-stats.component';



@NgModule({
  declarations: [
    ClubListComponent,
    ClubAddComponent,
    ClubModifyComponent,
    ClubDetailsComponent,
    ClubListFrontComponent,
    ProjectPredictionComponent,
    ObjectToArrayPipe,
    MembersAnalyzeComponent,
    ClubStatsComponent,
   
  ],
 
  imports: [
    CommonModule,
    ClubRoutingModule,
    FormsModule,
    NgbModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    NgToastModule
  ]
})
export class ClubModule { }
