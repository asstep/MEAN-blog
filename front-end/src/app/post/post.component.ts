import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public post: object;
  public login: string;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.login = JSON.parse(localStorage.getItem('user')).login;
    }
    this.getPostById();
  }

  public deletePost(id) {
    console.log(id);
    this.authService.deletePost(id)
      .subscribe((res) => {
        console.log(res);

        if (!res.success) {
          this._flashMessagesService.show(
            'Post not deleted!',
            { cssClass: 'alert-danger', timeout: 3000 });

        } else {
          this._flashMessagesService.show(
            'Post deleted!',
            { cssClass: 'alert-success', timeout: 3000 });

          this.router.navigate(['/']);
        }
      })
  }

  private getPostById() {
    this.authService.getPostById(this.route.snapshot.params.id)
      .subscribe((res) => {
        this.post = res;
      })
  }

}
