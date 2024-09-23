import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  login(userName:string, password:string):LoginResponse{
        const storedPassword = localStorage.getItem(userName.toLowerCase());

        if (storedPassword !== password) {
            return{
                success: false,
                message: 'Usuario o Contraseña incorrecta'
            }
        }
        return{
            success:true
        }
  }

  register(user:User):SignUpResponse{
    if (localStorage.getItem(user.userName!.trim().toLowerCase())) {
        return{
            success: false,
            message: 'Usuario ya existe'
        }
    }

    localStorage.setItem(user.userName.trim().toLowerCase(), user.password);
    return{
        success:true
    }
  }
}
