import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'instance',
  templateUrl: `app.instance.component.html`
})

export class InstanceComponent{

  constructor(
    private router: Router
  ) { }

}