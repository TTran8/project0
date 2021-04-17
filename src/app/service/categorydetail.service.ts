import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, switchAll, toArray } from 'rxjs/operators';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root',
})
export class CategorydetailService {
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
  constructor(private http: HttpClient, private navbarService: NavbarService) {}
  getCategoryDetail(name: any) {
    const query = {
      category_name: name,
    };

    const params = new HttpParams()
      .set('fields', 'category_name,category_parent_id,_id,desc,_kmd')
      .set('query', JSON.stringify(query));

    return this.http.get<any>(this.categoryUrl, {
      headers: this.httpHeaders,
      params,
    });
  }
  getGroupCategoryPost(id: any) {
    const query = {
      category_parent_id: id,
    };
    const sort = { '_kmd.ect': -1 };
    const params = new HttpParams()
      .set('fields', 'title,imgUrl,_id,desc,_kmd')
      .set('query', JSON.stringify(query))
      .set('sort', JSON.stringify(sort));

    return this.http.get<any>(this.postUrl, {
      headers: this.httpHeaders,
      params,
    });
  }

  getCategoryDetailPost(id: any): Observable<any> {
    return this.navbarService.getGroupNavItems(id).pipe(
      switchAll(),

      mergeMap((val) => {
        return this.getGroupCategoryPost(val._id);
      }),
      toArray()
    );
  }
}
