import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { Flavor } from './flavor';
import { FlavorService } from './flavor.service';

@Component({
  moduleId: module.id,
  selector: 'flavor',
  templateUrl: `app.flavor.component.html`
})

export class FlavorComponent implements OnInit{
	flavors: Flavor[];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private flavorService: FlavorService
  ) { }

  ngOnInit(): void {
    this.getFlavor();
  }

  getFlavor(): void {
    this.authenticationService.authenticate().subscribe(token => {
      this.flavorService.getFlavor(token).subscribe(flavors => {
        this.flavors = flavors;
      });
    });
  }
}