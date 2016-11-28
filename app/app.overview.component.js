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
var authentication_service_1 = require('./authentication.service');
var instance_service_1 = require('./instance.service');
var flavor_service_1 = require('./flavor.service');
var tenant_service_1 = require('./tenant.service');
var OverviewComponent = (function () {
    function OverviewComponent(router, authenticationService, instanceService, flavorService, tenantService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.instanceService = instanceService;
        this.flavorService = flavorService;
        this.tenantService = tenantService;
    }
    OverviewComponent.prototype.ngOnInit = function () {
        this.getInstance();
    };
    OverviewComponent.prototype.getInstance = function () {
        var _this = this;
        this.authenticationService.authenticate().subscribe(function (token) {
            _this.instanceService.getInstance(token).subscribe(function (instances) {
                _this.instances = instances;
                var _loop_1 = function(ins) {
                    _this.flavorService.getFlavorById(token, ins["flavor_id"]).subscribe(function (flavor) {
                        ins.setFlavorName(flavor["name"]);
                    });
                    /*this.tenantService.getTenant(token).subscribe(tenants => {
                      for(let tn of tenants){
                        if(tn["id"] == ins["tenant_id"]){
                          ins.setTenantName(tn["name"]);
                        }
                      }
                    });*/
                    _this.instanceService.getInstanceUsageList(token, ins["id"]).subscribe(function (list) { return ins.setUsageTime(_this.instanceService.getUsage(list, 10, 2016)); });
                };
                for (var _i = 0, _a = _this.instances; _i < _a.length; _i++) {
                    var ins = _a[_i];
                    _loop_1(ins);
                }
            });
        });
    };
    OverviewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'overview',
            templateUrl: "app.overview.component.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, instance_service_1.InstanceService, flavor_service_1.FlavorService, tenant_service_1.TenantService])
    ], OverviewComponent);
    return OverviewComponent;
}());
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=app.overview.component.js.map