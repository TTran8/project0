import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-admin',
  templateUrl: './post-admin.component.html',
  styleUrls: ['./post-admin.component.scss'],
})
export class PostAdminComponent implements OnInit {
  //biến chứa tất cả các bài post
  allPost: any[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    //Lấy Allpost và đẩy vào biến allPost khi chạy trang

    this.postService.getAllPostAdminView().subscribe((item) => {
      this.allPost = item;
      console.log(this.allPost);
    });
  }

  onDeletePost(id: string) {
    this.postService.deletePost(id).subscribe(
      (data) => {
        console.log(data);
        // this.router.navigateByUrl('admin/post-admin');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigateByUrl('admin/post-admin');
          });
      },
      (err) => console.log(err)
    );
  }
}
