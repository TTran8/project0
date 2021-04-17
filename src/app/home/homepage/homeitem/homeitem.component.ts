import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/model';

@Component({
  selector: 'app-homeitem',
  templateUrl: './homeitem.component.html',
  styleUrls: ['./homeitem.component.scss'],
})
export class HomeitemComponent implements OnInit {
  @Input() category_name: any;
  @Input() homePost: any;
  newPost: any;
  subPosts: any;

  constructor() {}

  ngOnInit() {
    this.newPost = this.homePost[0];
    this.subPosts = this.homePost.slice(1);
  }
}
