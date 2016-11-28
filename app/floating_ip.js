"use strict";
var FloatingIP = (function () {
    function FloatingIP(floating_ip, fixed_ip, status) {
        this.floating_ip = floating_ip;
        this.fixed_ip = fixed_ip;
        this.status = status;
    }
    return FloatingIP;
}());
exports.FloatingIP = FloatingIP;
//# sourceMappingURL=floating_ip.js.map