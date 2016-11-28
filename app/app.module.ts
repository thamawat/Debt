import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { OverviewComponent } from './app.overview.component';
import { DataTransferComponent } from './app.data_transfer.component';
import { DiskComponent } from './app.disk.component';
import { FlavorComponent } from './app.flavor.component';
import { FloatingIPComponent } from './app.floating_ip.component';
import { InstanceComponent } from './app.instance.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './authentication.service';
import { InstanceService } from './instance.service';
import { TokenService } from './token.service';
import { FlavorService } from './flavor.service';
import { FloatingIPService } from './floating_ip.service';
import { TenantService } from './tenant.service';

@NgModule({
  imports:      [
  					BrowserModule,
            AppRoutingModule,
            HttpModule,
            JsonpModule
  				],
  declarations:	[
  					AppComponent,
  					OverviewComponent,
  					DataTransferComponent,
            DiskComponent,
            FlavorComponent,
            FloatingIPComponent,
            InstanceComponent
  				],
  bootstrap:	[
            AppComponent
  				],
  providers: 	[
            AuthenticationService,
            InstanceService,
            TokenService,
  					FlavorService,
            FloatingIPService,
            TenantService
  				]
})

export class AppModule { }