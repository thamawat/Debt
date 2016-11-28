import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Request, Response, RequestMethod } from '@angular/http';
import { OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService{
	private authenUrl = 'http://192.168.123.201:5000/v2.0/tokens';
	token: string;

	constructor (private http: Http) {
	}

	authenticate(): Observable<string> {
		let headers = new Headers();
		let body = `{
					"auth": {
						"passwordCredentials": {
						"username": "admin",
						"password": "passw0rd"
						},
						"tenantName": "test"
					}
				}`;
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({headers: headers});
		return this.http.post(this.authenUrl, body, options).map(this.extractData);
	}

	private extractData(res: Response) {
		res = res.json();
		this.token = res["access"]["token"]["id"];
		return res["access"]["token"]["id"];
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

	private getTokenStatus() : Observable<number> {
		console.log("request to v2.1");
		let status = 0;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('X-Auth-Token', this.token);
		let options = new RequestOptions({headers: headers});
		return this.http.get('http://192.168.123.201:8774/v2.1', options).map(res => res.status);
	}

	private isAlive(): boolean {
		let status = 0;
		this.getTokenStatus().subscribe(st => status = st);
		console.log("token status = "+status);
		if(status == 200)
			return true;
		else
			return false;
	}
}