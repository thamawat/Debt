import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Request, Response, RequestMethod } from '@angular/http';
import { OnInit } from '@angular/core';

import { Instance } from './instance';
import { InstanceUsage } from './instance_usage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstanceService {
	private instanceUrl = 'http://192.168.123.201:8774/v2.1/servers';

	constructor (
		private http: Http
	) { }

	getInstance(token: string): Observable<Instance[]> {
		let flavors = new Array<Instance>();
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('X-Auth-Token', token);
		let options = new RequestOptions({headers: headers});
		return this.http.get(this.instanceUrl+'/detail', options).map(this.extractData);
	}

	private extractData(res: Response) {
		res = res.json();
		let instanceslist = new Array<Instance>();
		for(let ins of res["servers"]) {
			let inst = new Instance(ins["status"], ins["addresses"]["internal"].length > 0 ? ins["addresses"]["internal"][0]["addr"] : '-', ins["addresses"]["internal"].length > 1 ? ins["addresses"]["internal"][1]["addr"] : '-', ins["key_name"], ins["image"]["id"], ins["flavor"]["id"], ins["id"], ins["security_groups"]["name"], ins["user_id"], ins["name"], ins["tenant_id"]);
			instanceslist.push(inst);
		}
		return instanceslist;
	}

	getInstanceUsageList(token: string, instance_id: string): Observable<InstanceUsage[]> {
		let instance_usage = new Array<InstanceUsage>();
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('X-Auth-Token', token);
		let options = new RequestOptions({headers: headers});
		return this.http.get(this.instanceUrl+'/'+instance_id+'/os-instance-actions', options).map(this.extractUsage);
	}

	private extractUsage(res: Response) {
		res = res.json();
		let usagelist = new Array<InstanceUsage>();
		for(let ia of res["instanceActions"]) {
			let usg = new InstanceUsage(ia["start_time"], ia["action"]);
			usagelist.push(usg);
		}
		return usagelist;
	}

	getUsage(instanceUsage: InstanceUsage[], month: number, year: number): number {
		let usage_time = 0;
		let complete = true;
		let start_time = 0;
		let stop_time = 0;
		let count = 0;
		for(let usage of instanceUsage){
			if(Number(usage["time"].substring(5, 7)) == month && Number(usage["time"].substring(0, 4)) == year){
			switch(usage["action"]){
				case "create":case "start":case "unshelve":case "resume":case "unpause":{
					if(!complete && stop_time != 0){
						start_time = this.toMinute(usage["time"]);
						usage_time += stop_time - start_time;
						complete = true;
					}
					else if(stop_time == 0){
						let year_minute = year*366*24*60;
						let month_minute = 0;
						start_time = this.toMinute(usage["time"]);
						switch(month){
							case 12: month_minute += 31;
							case 11: month_minute += 30;
							case 10: month_minute += 31;
							case 9: month_minute += 30;
							case 8: month_minute += 31;
							case 7: month_minute += 31;
							case 6: month_minute += 30;
							case 5: month_minute += 31;
							case 4: month_minute += 30;
							case 3: month_minute += 31;
							case 2: year%4 == 0 ? month_minute += 29 : month_minute += 28;
							case 1: month_minute += 31;
							default: break;
						}
						month_minute = month_minute*24*60;
						usage_time += (year_minute+month_minute) - start_time;
					}
					start_time = 0;
					break;
				}
				case "stop":case "shelve":case "suspend":case "pause":{
					if(complete && count != instanceUsage.length-1){
						stop_time = this.toMinute(usage["time"]);
						complete = false;
					}
					else if(count == instanceUsage.length-1){
						stop_time = this.toMinute(usage["time"]);
						usage_time += stop_time;
					}
					break;
				}
			}
			count ++;
			}
		}
		return usage_time;
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

	toMinute(time: string): number{
		let year = Number(time.substring(0, 4))*366*24*60;
		let month = 0;
		switch(Number(time.substring(5, 7))){
			case 12: month = month+30;
			case 11: month = month+31;
			case 10: month = month+30;
			case 9: month = month+31;
			case 8: month = month+31;
			case 7: month = month+30;
			case 6: month = month+31;
			case 5: month = month+30;
			case 4: month = month+31;
			case 3: Number(time.substring(0, 4))%4 == 0 ? month = month+29 : month = month+28;
			case 2: month = month+31;
			case 1: month = month+0;
			default: break;
		}
		month = month*24*60;
		let day = Number(time.substring(8, 10))*24*60;
		let hour = Number(time.substring(11, 13))*60;
		let minute = Number(time.substring(14, 16));
		return year+month+day+hour+minute;
	}
}