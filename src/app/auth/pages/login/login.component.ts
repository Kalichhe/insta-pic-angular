import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    user:User = {
        userName: '',
        password: ''
    };

    loginForm = this.fb.group({
        userName:[''],
        password:['']
    });

    constructor(private fb:FormBuilder, private router:Router) { }

    onLogin(){

        let userName = this.loginForm.value.userName;
        let password = this.loginForm.value.password;

        if (!userName || !password) {
            alert('Debe diligenciar los campos');
            return;
        }
        const storedPassword = localStorage.getItem(userName.toLowerCase());

        if (storedPassword === null) {
            alert('Usuario no registrado');
        } else if (storedPassword === password) {
            alert('Inicio de sesión exitoso');
            this.router.navigateByUrl('/home');
        } else {
            alert('Contraseña incorrecta');
        }
    }

}
