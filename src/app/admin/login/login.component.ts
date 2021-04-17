import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm = this.formBuild.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}
  onLogin() {
    const { username, password } = this.userLoginForm.value;

    const user: User = {
      username,
      password,
    };
    this.auth.login(user).subscribe(
      (data) => {
        this.router.navigateByUrl('admin/dashboard');
      },
      (err) => {
        this.userLoginForm.setErrors({ invalidCredential: true });
        console.log(err);
      }
    );
  }
}
