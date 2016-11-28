export class Instance {
	status: string;
	fixed_address : string;
	floating_address: string;
	key_name: string;
	image_id: string;
	flavor_id: number;
	id: string;
	security_groups: string;
	user_id: string;
	name: string;
	tenant_id: string;
	flavor_name: string;
	tenant_name: string;
	usage_time_day: number;
	usage_time_hour: number;
	usage_time_minute: number;
	usage_time: number;

	constructor(status: string, fixed_address : string,	floating_address: string, key_name: string, image_id: string, flavor_id: number, id: string, security_groups: string, user_id: string, name: string, tenant_id: string) {
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

	setFlavorName(flavor_name: string): void {
		this.flavor_name = flavor_name;
	}

	setTenantName(tenant_name: string): void {
		this.tenant_name = tenant_name;
	}

	setUsageTime(usage_time: number): void{
		this.usage_time = usage_time;
		this.usage_time_day = (usage_time - (usage_time%1440))/1440;
		this.usage_time_minute = usage_time%60;
		this.usage_time_hour = ((usage_time - (this.usage_time_day*1440))-this.usage_time_minute)/60;
	}
}