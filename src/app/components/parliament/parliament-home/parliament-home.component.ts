import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';

@Component({
  selector: 'app-parliament-home',
  templateUrl: './parliament-home.component.html',
  styleUrls: ['./parliament-home.component.scss']
})
export class ParliamentHomeComponent implements OnInit {

  private tenants_id : any;
  private parl_status : String;
  private loading : boolean;

  constructor(private activeRoute: ActivatedRoute,
             private parliamentService: ParliamentService, ) { }

  ngOnInit() {
    localStorage.setItem("sidebar", "tenant");
    localStorage.setItem("navbarTitle", "Skupština stanara");

    this.activeRoute.params.subscribe(params => {
      this.tenants_id = (params['id']);
   });
   const token = JSON.parse(localStorage.getItem('token'));
   this.getParliamentStatus();
  
  }

   // statuses: NONE, ANNOUNCED, VOTING, VOTED
   getParliamentStatus() {
    this.parliamentService.checkParliamentStatus(this.tenants_id).subscribe(res =>{
      this.parl_status = JSON.parse(JSON.stringify(res)).status;
      this.loading = false;
     
    });
  }

}
