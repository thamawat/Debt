export class Flavor {
	name: string;
	vcpu: number;
	ram: number;
	disk: number;
	ephemeral_disk: number;
	swap_disk: number;
	rxtx: number;
	id: number;
	ispublic: string;
	price: number;

	constructor(name: string, vcpu: number, ram: number, disk: number, ephemeral_disk: number, swap_disk: number, rxtx: number, id: number, ispublic: string) {
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
}