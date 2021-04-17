import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/service/navbar.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  Category_main: any[] = [];
  Category_mainSelected?: [];
  Category_parent: any[] = [];
  Category_parentSelected?: [];
  addPostForm = this.formBuild.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required]],
    html: ['', [Validators.required]],
    Category_main_id: ['', [Validators.required]],
    Category_parent_id: ['', [Validators.required]],
    imgUrl: [''],
    desc: [''],
    group: [''],
  });
  constructor(
    private formBuild: FormBuilder,
    private router: Router,
    private navbarService: NavbarService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.navbarService.getCategoryMainItem().subscribe((item) => {
      this.Category_main = item;
      console.log(this.Category_main);
    });
  }
  onSubmit() {
    const newPost = this.addPostForm.value;
    console.log(newPost);
    this.postService.createPost(newPost).subscribe(
      (data) => {
        console.log(data);
        this.addPostForm.reset();
        this.router.navigateByUrl('admin/post-admin');
      },
      (err) => console.log(err)
    );
  }

  onChange(val: any) {
    console.log(val);
    this.navbarService.getGroupCategoryItems(val).subscribe((item) => {
      this.Category_parent = item;
      console.log(this.Category_parent);
    });
  }
}
