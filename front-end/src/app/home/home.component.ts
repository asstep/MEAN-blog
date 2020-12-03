import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public posts: Array<object>;
  public category: string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getAllPosts().subscribe( posts => {
      this.posts = posts;
    });
  }

  public setCategory(category: string) {
    this.category = category;
  }
}
