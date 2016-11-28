"use strict";
var Flavor = (function () {
    function Flavor(name, vcpu, ram, disk, ephemeral_disk, swap_disk, rxtx, id, ispublic) {
        this.name = name;
        this.vcpu = vcpu;
        this.ram = ram;
        this.disk = disk;
        this.ephemeral_disk = ephemeral_disk;
        this.swap_disk = swap_disk;
        this.rxtx = rxtx;
        this.id = id;
        this.ispublic = ispublic;
    }
    return Flavor;
}());
exports.Flavor = Flavor;
//# sourceMappingURL=flavor.js.map