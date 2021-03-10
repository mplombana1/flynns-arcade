import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  user: FormGroup;
  error: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.fb.group({
      username: ['harry potter', [Validators.required]],
      password: ['hedwig', [Validators.required]],
    });
  }
  submit(): void {
    const user = this.user.value;

    this.auth.login(user).subscribe(
      (jwt) => {
        localStorage.setItem('jwt', jwt);
        this.router.navigate(['/home/collection']);
      },
      (err) => {
        this.error = err;
        console.log(' this.error:', this.error);
      }
    );
  }

  ngOnDestroy(): void {}
}
