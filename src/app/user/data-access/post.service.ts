import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import {
  ICredentials,
  IUser,
  IUserList,
} from '../../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { getToken } from './local-storage';
import { IPost } from '../../shared/interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService extends BaseHttpService {
  createPost(post: IPost): Observable<any> {
    let authToken = getToken();

    const headers = new HttpHeaders({
      Authorization: authToken || '',
      'Content-Type': 'application/json',
    });

    console.log('se estan enviando', post);

    return this.http.post<any>(`${this.apiUrl}/posts/create`, post, {
      headers,
    });
  }
  getPostsByUser(lastPostKey: any): Observable<any> {

    console.log('se hara el llamado con, ',lastPostKey)
    let pkParam = lastPostKey.pk.split('#')[0] // -> obtiene el username
    let skParam = lastPostKey.sk;

    return this.http.get<any>(
      `${this.apiUrl}/posts/user/${pkParam}/${skParam}`
    );
  }
}