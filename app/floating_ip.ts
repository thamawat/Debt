export class FloatingIP {
	floating_ip: string;
	fixed_ip: string;
	status: string;

	constructor(floating_ip: string, fixed_ip:string, status: string) {
		this.floating_ip = floating_ip;
		this.fixed_ip = fixed_ip;
		this.status = status;
	}
}