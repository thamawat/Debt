"use strict";
var Instance = (function () {
    function Instance(status, fixed_address, floating_address, key_name, image_id, flavor_id, id, security_groups, user_id, name, tenant_id) {
        this.status = status;
        this.fixed_address = fixed_address;
        this.floating_address = floating_address;
        this.key_name = key_name;
        this.image_id = image_id;
        this.flavor_id = flavor_id;
        this.id = id;
        this.security_groups = security_groups;
        this.user_id = user_id;
        this.name = name;
        this.tenant_id = tenant_id;
    }
    Instance.prototype.setFlavorName = function (flavor_name) {
        this.flavor_name = flavor_name;
    };
    Instance.prototype.setTenantName = function (tenant_name) {
        this.tenant_name = tenant_name;
    };
    Instance.prototype.setUsageTime = function (usage_time) {
        this.usage_time = usage_time;
        this.usage_time_day = (usage_time - (usage_time % 1440)) / 1440;
        this.usage_time_minute = usage_time % 60;
        this.usage_time_hour = ((usage_time - (this.usage_time_day * 1440)) - this.usage_time_minute) / 60;
    };
    return Instance;
}());
exports.Instance = Instance;
//# sourceMappingURL=instance.js.map