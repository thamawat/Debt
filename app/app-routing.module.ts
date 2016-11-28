import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent }   from './app.overview.component';
import { DataTransferComponent }   from './app.data_transfer.component';
import { DiskComponent }   from './app.disk.component';
import { FlavorComponent }   from './app.flavor.component';
import { FloatingIPComponent }   from './app.floating_ip.component';
import { InstanceComponent }   from './app.instance.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview',  component: OverviewComponent },
  { path: 'data_transfer', component: DataTransferComponent },
  { path: 'disk',     component: DiskComponent },
  { path: 'flavor',     component: FlavorComponent },
  { path: 'floating_ip',     component: FloatingIPComponent },
  { path: 'instance',     component: InstanceComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }