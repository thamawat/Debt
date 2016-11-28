export class Tenant {
	id: string;
	name: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}

	setId(id: string){
		this.id = id;
	}

	setName(name: string){
		this.name = name;
	}
}