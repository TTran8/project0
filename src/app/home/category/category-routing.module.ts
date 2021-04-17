import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { EditPostComponent } from 'src/app/admin/post-admin/edit-post/edit-post.component';
import { PostdetailComponent } from '../category/postdetail/postdetail.component';
import { CategorydetailComponent } from './categorydetail/categorydetail.component';

const categoryRoutes: Routes = [
  { path: 'post/:id', component: PostdetailComponent },

  {
    path: 'post/:id/edit/:id',
    component: EditPostComponent,
  },
  {
    path: '',
    children: [
      {
        path: ':name',
        component: CategorydetailComponent,
      },
      { path: ':name/:id', component: PostdetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
