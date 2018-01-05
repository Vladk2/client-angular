import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supervisro-home',
  templateUrl: './supervisro-home.component.html',
  styleUrls: ['./supervisro-home.component.scss']
})
export class SupervisroHomeComponent implements OnInit {
  id;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  	// primjer kako se hvata id iz linka ili neki drugi parametar koji je u routing zadata kao
  	// localhost:4200/supervisor/:id
  	this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       console.log(this.id);
    });
  }


}
