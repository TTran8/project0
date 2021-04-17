import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategorydetailComponent } from './categorydetail/categorydetail.component';
import { PostdetailComponent } from '../category/postdetail/postdetail.component';
import { CategoryRoutingModule } from './category-routing.module';
@NgModule({
  declarations: [CategorydetailComponent, PostdetailComponent],
  imports: [CommonModule, CategoryRoutingModule, ReactiveFormsModule],
  providers: [],
})
export class CategoryModule {}
