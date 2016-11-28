import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Request, Response, RequestMethod } from '@angular/http';
import { OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenService{
	private token: string;

	constructor(authenticationService: AuthenticationService) { 
	}
}