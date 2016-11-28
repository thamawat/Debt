import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { FloatingIP } from './floating_ip';
import { FloatingIPService } from './floating_ip.service';

@Component({
  moduleId: module.id,
  selector: 'floating_ip',
  templateUrl: `app.floating_ip.component.html`
})

export class FloatingIPComponent implements OnInit{
  floatingip: FloatingIP[];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private floatingipService: FloatingIPService
  ) { }

  ngOnInit(): void {
    this.getFloatingIP();
  }

  getFloatingIP(): void {
    this.authenticationService.authenticate().subscribe(token => this.floatingipService.getFloatingIP(token).subscribe(floatingip => this.floatingip = floatingip));
  }
}