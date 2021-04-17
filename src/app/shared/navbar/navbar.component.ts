import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/model';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  laptrinh: Category[] = [];
  anothers: Category[] = [];
  more: Category[] = [];
  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
    this.navbarService.getGroupCategoryItems('none').subscribe((navItem) => {
      this.laptrinh = navItem.filter(
        (item) => item.category_name == 'Lập Trình'
      );
      this.more = navItem.filter((item) => item.category_name == 'More');
      this.anothers = navItem.filter(
        (item) =>
          item.category_name != 'More' && item.category_name != 'Lập Trình'
      );
    });
  }
}
