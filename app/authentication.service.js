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
var Observable_1 = require('rxjs/Observable');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.authenUrl = 'http://192.168.123.201:5000/v2.0/tokens';
    }
    AuthenticationService.prototype.authenticate = function () {
        var headers = new http_1.Headers();
        var body = "{\n\t\t\t\t\t\"auth\": {\n\t\t\t\t\t\t\"passwordCredentials\": {\n\t\t\t\t\t\t\"username\": \"admin\",\n\t\t\t\t\t\t\"password\": \"passw0rd\"\n\t\t\t\t\t\t},\n\t\t\t\t\t\t\"tenantName\": \"test\"\n\t\t\t\t\t}\n\t\t\t\t}";
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.authenUrl, body, options).map(this.extractData);
    };
    AuthenticationService.prototype.extractData = function (res) {
        res = res.json();
        this.token = res["access"]["token"]["id"];
        return res["access"]["token"]["id"];
    };
    AuthenticationService.prototype.handleError = function (error) {
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
    AuthenticationService.prototype.getTokenStatus = function () {
        console.log("request to v2.1");
        var status = 0;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('http://192.168.123.201:8774/v2.1', options).map(function (res) { return res.status; });
    };
    AuthenticationService.prototype.isAlive = function () {
        var status = 0;
        this.getTokenStatus().subscribe(function (st) { return status = st; });
        console.log("token status = " + status);
        if (status == 200)
            return true;
        else
            return false;
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map