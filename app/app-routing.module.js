"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var app_overview_component_1 = require('./app.overview.component');
var app_data_transfer_component_1 = require('./app.data_transfer.component');
var app_disk_component_1 = require('./app.disk.component');
var app_flavor_component_1 = require('./app.flavor.component');
var app_floating_ip_component_1 = require('./app.floating_ip.component');
var app_instance_component_1 = require('./app.instance.component');
var routes = [
    { path: '', redirectTo: '/overview', pathMatch: 'full' },
    { path: 'overview', component: app_overview_component_1.OverviewComponent },
    { path: 'data_transfer', component: app_data_transfer_component_1.DataTransferComponent },
    { path: 'disk', component: app_disk_component_1.DiskComponent },
    { path: 'flavor', component: app_flavor_component_1.FlavorComponent },
    { path: 'floating_ip', component: app_floating_ip_component_1.FloatingIPComponent },
    { path: 'instance', component: app_instance_component_1.InstanceComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map