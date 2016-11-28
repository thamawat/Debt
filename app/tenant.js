"use strict";
var Tenant = (function () {
    function Tenant(id, name) {
        this.id = id;
        this.name = name;
    }
    Tenant.prototype.setId = function (id) {
        this.id = id;
    };
    Tenant.prototype.setName = function (name) {
        this.name = name;
    };
    return Tenant;
}());
exports.Tenant = Tenant;
//# sourceMappingURL=tenant.js.map