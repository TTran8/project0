import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostAdminComponent } from './post-admin/post-admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { adminRoutingModule } from './admin-routing.module';
import { NgBootstrapNestedSelectModule } from 'ng-bootstrap-nested-select';
import { CreatePostComponent } from './post-admin/create-post/create-post.component';
import { EditPostComponent } from './post-admin/edit-post/edit-post.component';
import { CreateNavbarComponent } from './navbar-admin/create-navbar/create-navbar.component';
import { EditNavbarComponent } from './navbar-admin/edit-navbar/edit-navbar.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { CreateGroupComponent } from './group-admin/create-group/create-group.component';
import { EditGroupComponent } from './group-admin/edit-group/edit-group.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostAdminComponent,
    NavbarAdminComponent,
    CreatePostComponent,
    EditPostComponent,
    CreateNavbarComponent,
    EditNavbarComponent,
    GroupAdminComponent,
    CreateGroupComponent,
    EditGroupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    adminRoutingModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapNestedSelectModule,
    MaterialModule,
  ],
})
export class AdminModule {}
