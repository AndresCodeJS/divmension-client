import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { ICredentials, IUser } from '../../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { getToken } from './local-storage';

@Injectable()
export class UsersService extends BaseHttpService {
  setSignUpUser(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/create`, user);
  }

  setLoginUser(credentials: ICredentials): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, credentials);
  }

  getUserRefresh(): Observable<any> {
    let authToken = getToken();

    const headers = new HttpHeaders({
      Authorization: authToken!,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.apiUrl}/users/refresh-page`, { headers });
  }

  getUserList(user: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/search/${user}`);
  }
}
