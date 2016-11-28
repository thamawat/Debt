import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { InstanceService } from './instance.service';
import { FlavorService } from './flavor.service';
import { TenantService } from './tenant.service';
import { Instance } from './instance';
import { Flavor } from './flavor';
import { Tenant } from './tenant';
@Component({
  moduleId: module.id,
  selector: 'overview',
  templateUrl: `app.overview.component.html`
})

export class OverviewComponent implements OnInit{
	instances: Instance[];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private instanceService: InstanceService,
    private flavorService: FlavorService,
    private tenantService: TenantService
  ) { }

  ngOnInit(): void {
  	this.getInstance();
  }

  getInstance(): void {
  	this.authenticationService.authenticate().subscribe(token => {
  		this.instanceService.getInstance(token).subscribe(instances => {
  			this.instances = instances;
  			for(let ins of this.instances){
  				this.flavorService.getFlavorById(token, ins["flavor_id"]).subscribe(flavor => {
  					ins.setFlavorName(flavor["name"]);
  				});
          /*this.tenantService.getTenant(token).subscribe(tenants => {
            for(let tn of tenants){
              if(tn["id"] == ins["tenant_id"]){
                ins.setTenantName(tn["name"]);
              }
            }
          });*/
          this.instanceService.getInstanceUsageList(token, ins["id"]).subscribe(list => ins.setUsageTime(this.instanceService.getUsage(list, 10, 2016)));
  			}
  		});
  	});
  }
}