import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../services/alert-service/alert.service';

@Component({
    moduleId: module.id,
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
