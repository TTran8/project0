import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { NavbarService } from 'src/app/service/navbar.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-edit-navbar',
  templateUrl: './edit-navbar.component.html',
  styleUrls: ['./edit-navbar.component.scss'],
})
export class EditNavbarComponent implements OnInit {
  _idCategory: string = '';

  editCategoryForm = this.formBuild.group({
    category_name: ['', [Validators.required]],
    category_parent_id: ['', [Validators.required]],
    imgUrl: [''],
    desc: [''],
  });
  constructor(
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private router: Router,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => this.navbarService.getCategoryById(id))
      )
      .subscribe((item) => {
        this.editCategoryForm.controls['category_name'].setValue(
          item.category_name
        );
        this.editCategoryForm.controls['category_parent_id'].setValue(
          item.category_parent_id
        );
        this.editCategoryForm.controls['imgUrl'].setValue(item.imgUrl);
        // this.editCategoryForm.controls['_id'].setValue(item._id);
        this.editCategoryForm.controls['desc'].setValue(item.desc);
        this._idCategory = item._id;
        console.log(item);
      });
  }
  onSubmitEdit() {
    const editCategory = this.editCategoryForm.value;

    this.navbarService.editCategory(editCategory, this._idCategory).subscribe(
      (data) => {
        console.log(data);
        this.editCategoryForm.reset();
        this.router.navigateByUrl('admin/navbar-admin');
      },
      (err) => console.log(err)
    );
  }
}
