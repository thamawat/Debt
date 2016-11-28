import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import './rxjs-operators';

@Component({
	moduleId: module.id,
  	selector: 'my-app',
  	templateUrl: `navbar.html`
})

export class AppComponent implements OnInit{ 
	selectedButton: string;
	token: string;

	constructor(){ }

	ngOnInit(): void {
		this.onSelect('overview');
	}

	onSelect(button: string): void {
    	this.selectedButton = button;
  }
}