import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'data_transfer',
  templateUrl: `app.data_transfer.component.html`
})

export class DataTransferComponent{

  constructor(
    private router: Router
  ) { }

}