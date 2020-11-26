import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.authService.isAuthenticated());
  }

  public logoutUser() {
    this.authService.logout();
    this._flashMessagesService.show(
      'You are logged out',
      { cssClass: 'alert-success', timeout: 3000 });
  }
}
