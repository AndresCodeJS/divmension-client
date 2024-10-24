import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import {
  ICredentials,
  IUser,
  IUserList,
} from '../../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { getToken } from '../../user/data-access/local-storage';


@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseHttpService {
 

  getChat(addressee: string): Observable<any> {
    let authToken = getToken();

    const headers = new HttpHeaders({
      Authorization: authToken || '',
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.apiUrl}/chat/${addressee}`, { headers });
  }

 
}
