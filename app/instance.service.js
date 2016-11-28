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
var instance_1 = require('./instance');
var instance_usage_1 = require('./instance_usage');
var Observable_1 = require('rxjs/Observable');
var InstanceService = (function () {
    function InstanceService(http) {
        this.http = http;
        this.instanceUrl = 'http://192.168.123.201:8774/v2.1/servers';
    }
    InstanceService.prototype.getInstance = function (token) {
        var flavors = new Array();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.instanceUrl + '/detail', options).map(this.extractData);
    };
    InstanceService.prototype.extractData = function (res) {
        res = res.json();
        var instanceslist = new Array();
        for (var _i = 0, _a = res["servers"]; _i < _a.length; _i++) {
            var ins = _a[_i];
            var inst = new instance_1.Instance(ins["status"], ins["addresses"]["internal"].length > 0 ? ins["addresses"]["internal"][0]["addr"] : '-', ins["addresses"]["internal"].length > 1 ? ins["addresses"]["internal"][1]["addr"] : '-', ins["key_name"], ins["image"]["id"], ins["flavor"]["id"], ins["id"], ins["security_groups"]["name"], ins["user_id"], ins["name"], ins["tenant_id"]);
            instanceslist.push(inst);
        }
        return instanceslist;
    };
    InstanceService.prototype.getInstanceUsageList = function (token, instance_id) {
        var instance_usage = new Array();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.instanceUrl + '/' + instance_id + '/os-instance-actions', options).map(this.extractUsage);
    };
    InstanceService.prototype.extractUsage = function (res) {
        res = res.json();
        var usagelist = new Array();
        for (var _i = 0, _a = res["instanceActions"]; _i < _a.length; _i++) {
            var ia = _a[_i];
            var usg = new instance_usage_1.InstanceUsage(ia["start_time"], ia["action"]);
            usagelist.push(usg);
        }
        return usagelist;
    };
    InstanceService.prototype.getUsage = function (instanceUsage, month, year) {
        var usage_time = 0;
        var complete = true;
        var start_time = 0;
        var stop_time = 0;
        var count = 0;
        for (var _i = 0, instanceUsage_1 = instanceUsage; _i < instanceUsage_1.length; _i++) {
            var usage = instanceUsage_1[_i];
            if (Number(usage["time"].substring(5, 7)) == month && Number(usage["time"].substring(0, 4)) == year) {
                switch (usage["action"]) {
                    case "create":
                    case "start":
                    case "unshelve":
                    case "resume":
                    case "unpause": {
                        if (!complete && stop_time != 0) {
                            start_time = this.toMinute(usage["time"]);
                            usage_time += stop_time - start_time;
                            complete = true;
                        }
                        else if (stop_time == 0) {
                            var year_minute = year * 366 * 24 * 60;
                            var month_minute = 0;
                            start_time = this.toMinute(usage["time"]);
                            switch (month) {
                                case 12: month_minute += 31;
                                case 11: month_minute += 30;
                                case 10: month_minute += 31;
                                case 9: month_minute += 30;
                                case 8: month_minute += 31;
                                case 7: month_minute += 31;
                                case 6: month_minute += 30;
                                case 5: month_minute += 31;
                                case 4: month_minute += 30;
                                case 3: month_minute += 31;
                                case 2: year % 4 == 0 ? month_minute += 29 : month_minute += 28;
                                case 1: month_minute += 31;
                                default: break;
                            }
                            month_minute = month_minute * 24 * 60;
                            usage_time += (year_minute + month_minute) - start_time;
                        }
                        start_time = 0;
                        break;
                    }
                    case "stop":
                    case "shelve":
                    case "suspend":
                    case "pause": {
                        if (complete && count != instanceUsage.length - 1) {
                            stop_time = this.toMinute(usage["time"]);
                            complete = false;
                        }
                        else if (count == instanceUsage.length - 1) {
                            stop_time = this.toMinute(usage["time"]);
                            usage_time += stop_time;
                        }
                        break;
                    }
                }
                count++;
            }
        }
        return usage_time;
    };
    InstanceService.prototype.handleError = function (error) {
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
    InstanceService.prototype.toMinute = function (time) {
        var year = Number(time.substring(0, 4)) * 366 * 24 * 60;
        var month = 0;
        switch (Number(time.substring(5, 7))) {
            case 12: month = month + 30;
            case 11: month = month + 31;
            case 10: month = month + 30;
            case 9: month = month + 31;
            case 8: month = month + 31;
            case 7: month = month + 30;
            case 6: month = month + 31;
            case 5: month = month + 30;
            case 4: month = month + 31;
            case 3: Number(time.substring(0, 4)) % 4 == 0 ? month = month + 29 : month = month + 28;
            case 2: month = month + 31;
            case 1: month = month + 0;
            default: break;
        }
        month = month * 24 * 60;
        var day = Number(time.substring(8, 10)) * 24 * 60;
        var hour = Number(time.substring(11, 13)) * 60;
        var minute = Number(time.substring(14, 16));
        return year + month + day + hour + minute;
    };
    InstanceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], InstanceService);
    return InstanceService;
}());
exports.InstanceService = InstanceService;
//# sourceMappingURL=instance.service.js.map