import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/model';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'https://baas.kinvey.com/user/kid_SyjFnRBz_/login';

  private apiAppKey: string = 'kid_SyjFnRBz_';
  private kinveyAppSecret: string = 'ca7d2fec95214b5db874fcd767c8127c';
  behaviorSub = new BehaviorSubject<boolean>(false);
  isLogged = this.behaviorSub.asObservable().pipe(distinctUntilChanged());

  constructor(private http: HttpClient) {}
  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + btoa(this.apiAppKey + ':' + this.kinveyAppSecret),
      }),
    };
    return this.http.post<any>(this.loginUrl, user, httpOptions).pipe(
      tap((val) => {
        localStorage.setItem('authToken', val._kmd.authtoken);
        localStorage.setItem('userid', val._id);
        this.behaviorSub.next(true);
      })
    );
  }
}
