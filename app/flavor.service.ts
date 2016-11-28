import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Request, Response, RequestMethod } from '@angular/http';
import { OnInit } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { Flavor } from './flavor';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FlavorService {
	private flavorUrl = 'http://192.168.123.201:8774/v2.1/flavors';

	constructor (
		private http: Http,
		private authenticationService: AuthenticationService
	) { }

	getFlavor(token: string): Observable<Flavor[]> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('X-Auth-Token', token);
		let options = new RequestOptions({headers: headers});
		return this.http.get(this.flavorUrl+'/detail', options).map(this.extractData);
	}

	getFlavorById(token: string, flavor_id: number): Observable<Flavor> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('X-Auth-Token', token);
		let options = new RequestOptions({headers: headers});
		return this.http.get(this.flavorUrl+'/'+flavor_id, options).map(this.extractFlavor);
	}

	private extractData(res: Response) {
		res = res.json();
		let flavorslist = new Array<Flavor>();
		for(let flv of res["flavors"]) {
			let fv = new Flavor(flv["name"], flv["vcpus"], flv["ram"], flv["disk"], flv["OS-FLV-EXT-DATA:ephemeral"], flv["swap"] == "" ? 0 : flv["swap"], flv["rxtx_factor"], flv["id"], flv["os-flavor-access:is_public"]);
			flavorslist.push(fv);
		}
		return flavorslist;
	}

	private extractFlavor(res: Response) {
		res = res.json();
		let flavor = new Flavor(res["flavor"]["name"], res["flavor"]["vcpus"], res["flavor"]["ram"], res["flavor"]["disk"], res["flavor"]["OS-FLV-EXT-DATA:ephemeral"], res["flavor"]["swap"] == "" ? 0 : res["flavor"]["swap"], res["flavor"]["rxtx_factor"], res["flavor"]["id"], res["flavor"]["os-flavor-access:is_public"]);
		return flavor;
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