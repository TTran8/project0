import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay } from 'rxjs/operators';
import { Category } from 'src/app/model/model';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss'],
})
export class NavbarAdminComponent implements OnInit {
  category: Category[] = [];
  categorySelected?: Category;
  selectionList: Category[] = [];
  selectedClassification: string = '';
  constructor(private router: Router, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.getGroupCategoryItems('none').subscribe((item) => {
      this.category = item;
    });
  }

  onDropdownItemSelected(item: any) {
    this.categorySelected = item;
    console.log(this.categorySelected);
    this.selectedClassification = item.category_name;
    console.log(this.selectedClassification);
  }

  deleteCategory(id: any) {
    this.navbarService.deleteCategory(id).subscribe(
      (data) => {
        console.log(data);
        this.navbarService.getCategoryItems().pipe(shareReplay());
        // this.router.navigateByUrl('admin/post-admin');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigateByUrl('admin/navbar-admin');
          });
      },
      (err) => console.log(err)
    );
  }
}
