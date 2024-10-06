import { SHARED_IMPORTS } from '../../../const/shared.modules';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.fb.group({
    userName: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
         Validators.maxLength(12)
        ],
    ],
    password: ['', [
      Validators.required
    ]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  onLogin() {
    if (!this.loginForm.valid) {
      Swal.fire({
        title: 'Ingreso',
        text: 'Debe diligenciar todos los campos',
        icon: 'error',
      });
      return;
    }
    let userName = this.loginForm.value.userName ?? '';
    let password = this.loginForm.value.password ?? '';
    let response = this.userService.login(userName, password);

    if (response.success) {
      this.router.navigateByUrl('/home');
    } else {
      Swal.fire({
        title: 'Ingreso',
        text: response.message,
        icon: 'error',
      });
    }
  }
}
