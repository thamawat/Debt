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
var http_1 = require('@angular/http');
var floating_ip_1 = require('./floating_ip');
var Observable_1 = require('rxjs/Observable');
var FloatingIPService = (function () {
    function FloatingIPService(http) {
        this.http = http;
        this.floatingUrl = 'http://192.168.123.201:9696/v2.0/floatingips';
    }
    FloatingIPService.prototype.getFloatingIP = function (token) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.floatingUrl, options).map(this.extractData);
    };
    FloatingIPService.prototype.extractData = function (res) {
        res = res.json();
        var floatingip = new Array();
        for (var _i = 0, _a = res["floatingips"]; _i < _a.length; _i++) {
            var ip = _a[_i];
            var fip = new floating_ip_1.FloatingIP(ip["floating_ip_address"], ip["fixed_ip_address"] == null ? '-' : ip["fixed_ip_address"], ip["status"]);
            floatingip.push(fip);
        }
        return floatingip;
    };
    FloatingIPService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    FloatingIPService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FloatingIPService);
    return FloatingIPService;
}());
exports.FloatingIPService = FloatingIPService;
//# sourceMappingURL=floating_ip.service.js.map