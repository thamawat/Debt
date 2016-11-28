import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Request, Response, RequestMethod } from '@angular/http';
import { OnInit } from '@angular/core';

import { FloatingIP } from './floating_ip';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FloatingIPService{
	private floatingUrl = 'http://192.168.123.201:9696/v2.0/floatingips';

	constructor (
		private http: Http
	) { }

	getFloatingIP(token: string): Observable<FloatingIP[]> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('X-Auth-Token', token);
		let options = new RequestOptions({headers: headers});
		return this.http.get(this.floatingUrl, options).map(this.extractData);
	}

	private extractData(res: Response) {
		res = res.json();
		let floatingip = new Array<FloatingIP>();
		for(let ip of res["floatingips"]) {
			let fip = new FloatingIP(ip["floating_ip_address"], ip["fixed_ip_address"] == null ? '-' : ip["fixed_ip_address"], ip["status"]);
			floatingip.push(fip);
		}
		return floatingip;
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