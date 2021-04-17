import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, map, switchAll, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private categoryUrl: string = `https://baas.kinvey.com/appdata/kid_SyjFnRBz_/category`;
  private postUrl = 'https://baas.kinvey.com/appdata/kid_SyjFnRBz_/post';

  private apiAppKey: string = 'kid_SyjFnRBz_';
  private authToken =
    '87528690-7468-4bdd-aa52-25f0635f29f4.Xmbv5hLsf+ZOfxf2emD5R/7ozClA8e/9VxgHcL2KDGA=';

  private httpHeaders = new HttpHeaders({
    Authorization: `Kinvey ${this.authToken}`,
    'Content-Type': 'application/json',
  });
  private authMaster = `Basic a2lkX1N5akZuUkJ6Xzo4ZmVlMDAwZmE5YTk0ZWI2ODc1ODk2MjZkNTFhYmIwMw==`;
  private httpOptionsCategory = {
    headers: new HttpHeaders({
      Authorization: this.authMaster,
    }),
  };

  constructor(private http: HttpClient) {}
  // dùng category_main_id lấy post , chỉ lấy 5 bài post mới nhất
  getHomePostItems(val: any): Observable<any> {
    const query = {
      category_main_id: val,
    };

    const sort = {
      '_kmd.lmt': -1,
    };
    const params = new HttpParams()
      .set('fields', 'title,_id,_kmd,desc,imgUrl')
      .set('query', JSON.stringify(query))
      .set('sort', JSON.stringify(sort))
      .set('limit', '5');

    return this.http.get<any>(this.postUrl, {
      headers: this.httpHeaders,
      params,
    });
  }

  getHomeItems(): Observable<any[]> {
    const query = {
      category_home: 'vote',
    };
    const sort = {
      _id: 1,
    };
    const params = new HttpParams()
      .set('fields', 'category_name') // chỉ lấy category_name và thời gian
      .set('query', JSON.stringify(query))
      .set('sort', JSON.stringify(sort));
    return this.http
      .get<any[]>(this.categoryUrl, {
        headers: this.httpHeaders,
        params,
      })
      .pipe(
        switchAll(), // tách từng luồng  ra

        map((val) => ({
          category_name: val.category_name,
          _id: val._id,
          _kmd: val._kmd,
          children: [],
        })),

        concatMap((val: any) => {
          return forkJoin([of(val), this.getHomePostItems(val._id)]); //concatMap chạy lần lượt tuần tự từng luồng ,đảm bảo thứ tự
        }),

        map(([parent, children]) => {
          // kết quả cái concatMap trên trả về children
          parent.children = [...children]; //nhét children vào array children của category

          return parent;
        }),
        toArray() // gộp tất cả thành array
      );
  }
  //sidebar post
  getNewPost(): Observable<any> {
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

  getSideBarPostItems(val: any): Observable<any> {
    const query = {
      category_parent_id: val,
    };

    const sort = {
      '_kmd.lmt': -1,
    };
    const params = new HttpParams()
      .set('fields', 'title,_id,_kmd')
      .set('query', JSON.stringify(query))
      .set('sort', JSON.stringify(sort))
      .set('limit', '15');

    return this.http.get<any>(this.postUrl, {
      headers: this.httpHeaders,
      params,
    });
  }

  getSideBarItems(): Observable<any[]> {
    const query = {
      category_home_sidebar: 'vote',
    };
    const sort = {
      _id: 1,
    };
    const params = new HttpParams()
      .set('fields', 'category_name,_kmd') // chỉ lấy category_name và id (sort theo ID)
      .set('query', JSON.stringify(query))
      .set('sort', JSON.stringify(sort));
    return this.http
      .get<any[]>(this.categoryUrl, {
        headers: this.httpHeaders,
        params,
      })
      .pipe(
        switchAll(), // tách từng luồng  ra

        map((val) => ({
          category_name: val.category_name,
          _id: val._id,
          _kmd: val._kmd,
          children: [],
        })),

        concatMap((val: any) => {
          return forkJoin([of(val), this.getSideBarPostItems(val._id)]); //concatMap chạy lần lượt tuần tự từng luồng ,đảm bảo thứ tự
        }),

        map(([parent, children]) => {
          // kết quả cái concatMap trên trả về children
          parent.children = [...children]; //nhét children vào array children của category

          return parent;
        }),
        toArray() // gộp tất cả thành array
      );
  }
}
