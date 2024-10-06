import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm = this.fb.group({
    email: [''],
    userName:['', [
      Validators.required,
      Validators.minLength(8),
       Validators.maxLength(12)
      ]],
    password:['',
      [
        Validators.required

      ]],
    rePassword: [''],
    profileOwner: ['',
      [
        Validators.minLength(2),
        Validators.maxLength(3)
      ]]
  });

  constructor(private readonly fb:FormBuilder, private readonly router:Router, private readonly userService:UserService) {

  }

  onResgister() {
    if (!this.signUpForm.valid) {
      Swal.fire({
        text:'Debe diligenciar todos los campos',
        icon:'error'
      })
      return;
    }
    let userName = this.signUpForm.value.userName ?? '';
    let email = this.signUpForm.value.email ?? '';
    let password = this.signUpForm.value.password ?? '';
    let rePassword = this.signUpForm.value.rePassword ?? '';
    let profileOwner = this.signUpForm.value.profileOwner ?? '';

    if (rePassword !== password) {
      Swal.fire({
        text:'Las constraseñas no coinciden',
        icon:'error'
      })
      return;
    }

    let response = this.userService.register({userName, password, email, profileOwner})
    if(response.success){
      this.router.navigateByUrl('/home');
    }else{
      Swal.fire({
        text:response.message,
        icon:'error'
      })
    }

  }

}
