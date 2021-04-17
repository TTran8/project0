import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Category, Post } from 'src/app/model/model';
import { CategorydetailService } from 'src/app/service/categorydetail.service';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-categorydetail',
  templateUrl: './categorydetail.component.html',
  styleUrls: ['./categorydetail.component.scss'],
})
export class CategorydetailComponent implements OnInit {
  nameCategory: any;
  groupCategory: any;
  postCategory: any;
  descHtml: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryDetailService: CategorydetailService,
    private navbarService: NavbarService
  ) {}
  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('name')),
        switchMap((name) => this.categoryDetailService.getCategoryDetail(name))
      )
      .subscribe((item) => {
        this.nameCategory = item[0];
        this.descHtml = item[0].desc;

        this.navbarService.getGroupNavItems(item[0]._id).subscribe((item) => {
          return (this.groupCategory = item);
        });
        this.categoryDetailService
          .getCategoryDetailPost(item[0]._id)
          .subscribe((item) => {
            return (this.postCategory = item);
          });
      });
  }
}
