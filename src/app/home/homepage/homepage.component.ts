import { Component, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/model/model';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  homePost: Post[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    //get post home items

    this.homeService.getHomeItems().subscribe((item) => {
      return (this.homePost = item);
    });
  }
}
