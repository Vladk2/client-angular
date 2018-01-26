import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ParliamentHomeComponent } from '../../components/parliament/parliament-home/parliament-home.component';
import { ParliamentAnnounceComponent } from '../../components/parliament/parliament-announce/parliament-announce.component';
import { ParliamentProposalsComponent } from '../../components/parliament/parliament-proposals/parliament-proposals.component';
import { ParliamentVotingComponent } from '../../components/parliament/parliament-voting/parliament-voting.component';
import { ParliamentRecordComponent } from '../../components/parliament/parliament-record/parliament-record.component';
import { ParliamentService } from '../../services/parliament-service/parliament.service';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { CalendarModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    SidebarModule,
    NavbarModule,
    CalendarModule,
    FormsModule,

  ],
  declarations: [
    ParliamentHomeComponent,
    ParliamentAnnounceComponent,
    ParliamentProposalsComponent,
    ParliamentVotingComponent,
    ParliamentRecordComponent,
  ],
  providers: [
    ParliamentService
  ]
})
export class ParliamentModule { }
