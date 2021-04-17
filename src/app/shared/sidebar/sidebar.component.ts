import { Component, OnInit } from '@angular/core';
import { Category, Post } from 'src/app/model/model';
import { HomeService } from 'src/app/service/home.service';
import { NavbarService } from 'src/app/service/navbar.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  newPost: Post[] = [];
  sideBarPost: Post[] = [];
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getNewPost().subscribe((item) => {
      return (this.newPost = item);
    });
    this.homeService.getSideBarItems().subscribe((item) => {
      return (this.sideBarPost = item);
    });
  }
}
