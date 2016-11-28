import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Request, Response, RequestMethod } from '@angular/http';
import { OnInit } from '@angular/core';

import { Tenant } from './tenant';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TenantService {
	private tenantUrl = 'http://192.168.123.201:8774/v2.1/servers/d69e394f-73d4-41af-8148-3a3072634c99/os-instance-actions';
	//private tenantUrl = 'http://192.168.123.201:5000/v.20/tenants';

	constructor (
		private http: Http
	) { }

	getTenant(token: string): Observable<Tenant[]> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('X-Auth-Token', token);
		let options = new RequestOptions({headers: headers});
		return this.http.get(this.tenantUrl, options).map(this.extractData);
	}

	private extractData(res: Response) {
		res = res.json();
		let tenants = new Array<Tenant>();
		for(let tn of res["tenants"]) {
			let tenant = new Tenant(tn["id"], tn["name"]);
			tenants.push(tenant);
		}
		return tenants;
	}

  	private handleError (error: Response | any) {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		}
    	else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}