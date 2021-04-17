import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postUrl = 'https://baas.kinvey.com/appdata/kid_SyjFnRBz_/post';

  private apiAppKey: string = 'kid_SyjFnRBz_';

  private apiAppSecret: string = 'ca7d2fec95214b5db874fcd767c8127c';

  private authToken =
    '87528690-7468-4bdd-aa52-25f0635f29f4.Xmbv5hLsf+ZOfxf2emD5R/7ozClA8e/9VxgHcL2KDGA=';
  private authMaster = `Basic a2lkX1N5akZuUkJ6Xzo4ZmVlMDAwZmE5YTk0ZWI2ODc1ODk2MjZkNTFhYmIwMw==`;

  private httpHeaders = new HttpHeaders({
    Authorization: `Kinvey ${this.authToken}`,
    'Content-Type': 'application/json',
  });

  private httpOptionsPost = {
    headers: new HttpHeaders({
      Authorization: this.authMaster,
    }),
  };

  constructor(private http: HttpClient) {}

  //get All post view admin
  getAllPostAdminView(): Observable<any[]> {
    const sort = {
      '_kmd.lmt': -1,
    };
    const params = new HttpParams()
      .set('fields', 'title,author,_id,_kmd,desc,')
      .set('sort', JSON.stringify(sort))
      .set('limit', '40');

    return this.http.get<any>(this.postUrl, {
      headers: this.httpHeaders,
      params,
    });
  }
  //get post item
  getPostItem(id: any) {
    const query = {
      _id: id,
    };
    const params = new HttpParams().set('query', JSON.stringify(query));
    return this.http.get<any>(this.postUrl, {
      headers: this.httpHeaders,
      params,
    });
  }
  // create new post
  createPost(data: any) {
    return this.http.post<any>(this.postUrl, data, this.httpOptionsPost);
  }
  //edit post
  editPost(Post: any, id: any) {
    const editPostUrl = `${this.postUrl}/${id}`;
    console.log(editPostUrl);
    return this.http.put<any>(editPostUrl, Post, this.httpOptionsPost);
  }
  //delete post
  deletePost(id: string) {
    const editPostUrl = `${this.postUrl}/${id}`;

    return this.http.delete<any>(editPostUrl, this.httpOptionsPost);
  }

  getNewHomePost(): Observable<any> {
    const sort = {
      '_kmd.ect': -1, // sắp xếp theo thời gian chỉnh sửa bài mới nhất
    };
    const params = new HttpParams()
      .set('fields', 'title,_id,_kmd,imgUrl')
      .set('sort', JSON.stringify(sort))
      .set('limit', '5');

    return this.http.get<any>(this.postUrl, {
      headers: this.httpHeaders,
      params,
    });
  }
}
