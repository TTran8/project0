import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { NavbarService } from 'src/app/service/navbar.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  Category_main: any[] = [];
  Category_mainSelected?: [];
  Category_parent: any[] = [];
  Category_parentSelected?: [];
  _idPost: string = '';

  editPostForm = this.formBuild.group({
    title: [''],
    author: [''],
    html: [''],
    Category_main_id: [''],
    Category_parent_id: [''],
    imgUrl: [''],
    desc: [''],
    group: [''],
  });
  constructor(
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private router: Router,
    private navbarService: NavbarService,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    this.navbarService.getCategoryMainItem().subscribe((item) => {
      this.Category_main = item;
    });
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => this.postService.getPostItem(id))
      )
      .subscribe((item) => {
        this.editPostForm.controls['title'].setValue(item[0].title);
        this.editPostForm.controls['author'].setValue(item[0].author);
        this.editPostForm.controls['imgUrl'].setValue(item[0].imgUrl);
        // this.editPostForm.controls['_id'].setValue(item._id);
        this.editPostForm.controls['desc'].setValue(item[0].desc);
        this.editPostForm.controls['html'].setValue(item[0].html);
        this.Category_mainSelected = item[0].category_main_id;
        this.Category_parentSelected = item[0].category_parent_id;
        this._idPost = item[0]._id;
      });
  }
  onSubmit() {
    const editPost = this.editPostForm.value;
    console.log(editPost);
    console.log(this._idPost);
    this.postService.editPost(editPost, this._idPost).subscribe(
      (data) => {
        console.log(data);
        this.editPostForm.reset();
        this.router.navigateByUrl('admin/post-admin');
      },
      (err) => console.log(err)
    );
  }

  onChange(val: any) {
    console.log(val);
    this.navbarService.getGroupCategoryItems(val).subscribe((item) => {
      this.Category_parent = item;
    });
  }
}
