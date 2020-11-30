import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  user: object;

  constructor(
    public jwtHelper: JwtHelperService,
    private _http: HttpClient,
    private _router: Router
  ) {
  }

  registerUser(user): Observable<any> {
    return this._http.post('http://localhost:3000/account/reg', user);
  }

  authUser(user): Observable<any> {
    return this._http.post('http://localhost:3000/account/auth', user);
  }

  storeUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
    this._router.navigate(['/auth']);
  }

  isAuthenticated() {
    return !this.jwtHelper.isTokenExpired();
  }

  createPost(post): Observable<any> {
    return this._http.post('http://localhost:3000/account/dashbord', post);
  }

  getAllPosts(): Observable<any> {
    return this._http.get('http://localhost:3000/');
  }

  getPostById(id): Observable<any> {
    return this._http.get(`http://localhost:3000/post/${id}`);
  }

  deletePost(id): Observable<any> {
    return this._http.delete(`http://localhost:3000/post/${id}`);
  }
}
