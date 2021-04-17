import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-create-navbar',
  templateUrl: './create-navbar.component.html',
  styleUrls: ['./create-navbar.component.scss'],
})
export class CreateNavbarComponent implements OnInit {
  _idCategory: string = '';

  createCategoryForm = this.formBuild.group({
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
        this.createCategoryForm.controls['category_parent_id'].setValue(
          item._id
        );
      });
  }
  onSubmitCreate() {
    const newCategory = this.createCategoryForm.value;
    console.log(newCategory);
    this.navbarService.createCategory(newCategory).subscribe(
      (data) => {
        console.log(data);
        this.createCategoryForm.reset();
        this.router.navigateByUrl('admin/navbar-admin');
      },
      (err) => console.log(err)
    );
  }
}
