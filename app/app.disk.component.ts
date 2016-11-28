import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InstanceService } from './instance.service';

@Component({
  moduleId: module.id,
  selector: 'disk',
  templateUrl: `app.disk.component.html`
})

export class DiskComponent implements OnInit{

  	constructor(
    	private router: Router,
    	private instanceService: InstanceService
  	) { }

  	ngOnInit(): void {
  		
  	}
}