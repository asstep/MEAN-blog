import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public post$: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPostById();

    this.post$ = this.route.params
      .pipe(
        switchMap( (params: Params) => {
          console.log(params);
          return this.authService.getPostById(params['id']);
        })
      )
    // this.post$ = this.authService
  }

  private getPostById() {
    this.post$ = this.authService.getPostById(this.route.snapshot.params.id);
  }

}
