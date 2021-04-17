import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  mergeMap,
  shareReplay,
  switchAll,
  tap,
  toArray,
} from 'rxjs/operators';
import { Category } from '../model/model';
import { PostService } from './post.service';
@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private categoryUrl: string = `https://baas.kinvey.com/appdata/kid_SyjFnRBz_/category`;

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
  allNav$: Observable<any[]>;

  constructor(private http: HttpClient, private postService: PostService) {
    this.allNav$ = this.getCategoryItems().pipe(shareReplay());
  }
  getCategoryItems(): Observable<any[]> {
    const sort = { '_kmd.ect': 1 };
    const params = new HttpParams()
      .set('fields', 'category_name,category_parent_id,imgUrl,_id')
      .set('sort', JSON.stringify(sort)); // chỉ lấy category_name và category_parent_id

    return this.http
      .get<Category[]>(this.categoryUrl, {
        headers: this.httpHeaders,
        params,
      })
      .pipe(
        map((val) =>
          val.map((item) => ({
            category_name: item.category_name,
            category_parent_id: item.category_parent_id,
            imgUrl: item.imgUrl,
            _id: item._id,
          }))
        )
      );
  }
  getGroupCategoryItems(idparent: any): Observable<any[]> {
    return this.allNav$.pipe(
      map((val) => val.filter((item) => item.category_parent_id === idparent)), //trả về 1 array
      switchAll(), // tách observable ra thành từng phần tử 1
      map((val) => ({
        category_name: val.category_name,
        _id: val._id,
        imgUrl: val.imgUrl,
        children: val.children,
      })),
      mergeMap((val) =>
        combineLatest([of(val), this.getGroupCategoryItems(val._id)])
      ), // mergeMap return 1 Observable không cần subcriber
      tap(([parent, children]) => (parent.children = [...children])), // gán lại data, tap: chạy lại bên trên thêm lần nữa
      map(([parent, children]) => parent), // return thằng cha thôi
      toArray() // biến đổi thành 1 array
    );
  }

  getCategoryMainItem(): Observable<any[]> {
    const sort = { '_kmd.ect': 1 };
    const query = {
      category_parent_id: 'none',
    };
    const params = new HttpParams()
      .set('fields', 'category_name,category_parent_id,imgUrl,_id')
      .set('query', JSON.stringify(query))
      .set('sort', JSON.stringify(sort));
    // chỉ lấy category_name và category_parent_id

    return this.http
      .get<Category[]>(this.categoryUrl, {
        headers: this.httpHeaders,
        params,
      })
      .pipe(
        map((val) =>
          val.map((item) => ({
            category_name: item.category_name,
            category_parent_id: item.category_parent_id,
            imgUrl: item.imgUrl,
            _id: item._id,
          }))
        )
      );
  }

  //get category by ID
  getCategoryById(id: any) {
    const getCategoryByIdUrl = `${this.categoryUrl}/${id}`;
    return this.http.get<any>(getCategoryByIdUrl, {
      headers: this.httpHeaders,
    });
  }

  createCategory(newCategory: any) {
    return this.http.post<any>(
      this.categoryUrl,
      newCategory,
      this.httpOptionsCategory
    );
  }
  //edit Category
  editCategory(editCategory: any, id: any) {
    const editCategoryUrl = `${this.categoryUrl}/${id}`;
    return this.http.put<any>(
      editCategoryUrl,
      editCategory,
      this.httpOptionsCategory
    );
  }
  //delete category
  deleteCategory(id: any) {
    const getCategoryByIdUrl = `${this.categoryUrl}/${id}`;

    return this.http.delete<any>(getCategoryByIdUrl, this.httpOptionsCategory);
  }

  getGroupNavItems(idparent: any): Observable<any[]> {
    return this.allNav$.pipe(
      map((val) => val.filter((item) => item.category_parent_id === idparent)), //trả về 1 array
      switchAll(), // tách observable ra thành từng phần tử 1
      map((val) => ({
        category_name: val.category_name,
        _id: val._id,
        imgUrl: val.imgUrl,
        children: [],
      })),
      mergeMap((val: any) =>
        combineLatest([of(val), this.getGroupNavItems(val._id)])
      ), // mergeMap return 1 Observable không cần subcriber
      tap(([parent, children]) => (parent.children = [...children])), // gán lại data, tap: chạy lại bên trên thêm lần nữa
      map(([parent, children]) => parent), // return thằng cha thôi
      toArray() // biến đổi thành 1 array
    );
  }
}
