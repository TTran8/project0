import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateGroupComponent } from './group-admin/create-group/create-group.component';
import { EditGroupComponent } from './group-admin/edit-group/edit-group.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { CreateNavbarComponent } from './navbar-admin/create-navbar/create-navbar.component';
import { EditNavbarComponent } from './navbar-admin/edit-navbar/edit-navbar.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { CreatePostComponent } from './post-admin/create-post/create-post.component';
import { EditPostComponent } from './post-admin/edit-post/edit-post.component';
import { PostAdminComponent } from './post-admin/post-admin.component';

const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: AdminComponent,
      },
      {
        path: 'navbar-admin',
        children: [
          { path: '', component: NavbarAdminComponent },
          { path: 'create/:id', component: CreateNavbarComponent },
          { path: 'edit-navbar/:id', component: EditNavbarComponent },
        ],
      },

      {
        path: 'post-admin',
        children: [
          { path: '', component: PostAdminComponent },
          { path: 'create', component: CreatePostComponent },
          { path: 'edit-post/:id', component: EditPostComponent },
        ],
      },
      {
        path: 'group-admin',
        children: [
          { path: '', component: GroupAdminComponent },
          { path: 'create', component: CreateGroupComponent },
          { path: 'edit-post/:id', component: EditGroupComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class adminRoutingModule {}
