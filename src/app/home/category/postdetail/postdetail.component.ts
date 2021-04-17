import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { CategorydetailService } from 'src/app/service/categorydetail.service';
import { NavbarService } from 'src/app/service/navbar.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss'],
})
export class PostdetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryDetailService: CategorydetailService,
    private postService: PostService
  ) {}
  post: any;
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => this.postService.getPostItem(id))
      )
      .subscribe((item) => {
        console.log(item);
        this.post = item[0];
      });
  }
}
