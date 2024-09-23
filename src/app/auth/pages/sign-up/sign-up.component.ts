import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

    signUpForm = this.fb.group({
        userName:['', [Validators.required]],
        email:['', [Validators.required]],
        password:['', [Validators.required]],
        reTypePassword:['', [Validators.required]]
    });

    userService = inject(UserService);

    constructor(private fb:FormBuilder, private router:Router) { }

    onRegister(){
        if(!this.signUpForm.valid){
            Swal.fire({
                title: "Registrar usuario",
                text: "Diligencie todos los campos",
                icon: "error"
              });
            return;
        }

        const userName = this.signUpForm.value.userName;
        const password = this.signUpForm.value.password;
        const reTypePassword = this.signUpForm.value.reTypePassword;

        if(password !== reTypePassword){
            alert('Las contraseñas no coinciden');
            return;
        }

        if (localStorage.getItem(userName!.trim().toLowerCase())) {
            alert('El usuario ya existe');
            return;
        }

        localStorage.setItem(userName!.trim().toLowerCase(), password!);
        this.router.navigateByUrl('/home');
    }

}
