import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public category: string;
  public title: string;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public createPost() {
    const post = {
      category: this.category,
      title: this.title,
      author: JSON.parse(localStorage.getItem('user')).login,
      date: new Date()
    };

    this.authService.createPost(post)
      .subscribe((data) => {
        console.log(data);

        if (!data.success) {
          this._flashMessagesService.show(
            data.msg,
            { cssClass: 'alert-danger', timeout: 3000 });

        } else {
          this._flashMessagesService.show(
            data.msg,
            { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/'])
        }
      });

  }
}
