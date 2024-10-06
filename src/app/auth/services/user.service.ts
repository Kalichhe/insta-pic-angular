import { GalleryItem } from '../../features/posts/interfaces/gallery-item.inteface';
import { User } from '../interfaces/user.interface';
import { Injectable, signal } from '@angular/core';
import {
  LoginResponse,
  SignUpResponse,
} from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSignal = signal<User>({
    userName: '',
    password: '',
    email: '',
    profileOwner: '',
  });

  login(userName: string, password: string): LoginResponse {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userSrt = localStorage.getItem(userName.toLowerCase().trim());

      if (!userSrt) {
        return { success: false, message: 'Usuario o contraseña incorrectos' };
      }

      const user: User = JSON.parse(userSrt);

      if (user.password !== password) {
        return { success: false, message: 'Usuario o contraseña incorrectos' };
      }

      this.setUser(user);
      return {
        success: true,
      };
    } else {
      return { success: false, message: 'localStorage no está disponible' };
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('loggedUser');
    }
    this.userSignal.set({
      userName: '',
      email: '',
      password: '',
    });
  }

  saveImage(id: string, url: string, userName: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const newImage: GalleryItem = {
        id,
        url,
        comments: [],
      };
      let galleryStr = localStorage.getItem(`imgs-${userName}`);
      if (galleryStr) {
        let gallery = JSON.parse(galleryStr);
        gallery = [...gallery, newImage];
        localStorage.setItem(`imgs-${userName}`, JSON.stringify(gallery));
      } else {
        localStorage.setItem(`imgs-${userName}`, JSON.stringify([newImage]));
      }
    }
  }

  getGallery(userName: string): GalleryItem[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      let galleryStr = localStorage.getItem(`imgs-${userName}`);
      let gallery: GalleryItem[] = [];
      if (galleryStr) {
        gallery = JSON.parse(galleryStr);
      }
      return gallery;
    } else {
      return [];
    }
  }

  updateGallery(userName: string, gallery: GalleryItem[]) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(`imgs-${userName}`, JSON.stringify(gallery));
    }
  }

  register(user: User): SignUpResponse {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem(user.userName.toLowerCase().trim())) {
        return { success: false, message: 'Usuario ya existe' };
      }
      const userSrt = JSON.stringify(user);
      localStorage.setItem(user.userName.toLowerCase().trim(), userSrt);
      this.setUser(user);
      return { success: true };
    } else {
      return { success: false, message: 'localStorage no está disponible' };
    }
  }

  private setUser(user: User) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
    }
    this.userSignal.set(user);
  }

  getUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userSrt = localStorage.getItem('loggedUser');
      if (userSrt) {
        const user = JSON.parse(userSrt);
        this.userSignal.set(user);
      }
    }
    return this.userSignal;
  }

  saveGalleryItem(galleryItem: GalleryItem, userName: string) {
    let gallerySrt = localStorage.getItem(`gallery-${userName}`);
    let gallery: GalleryItem[] = [];
    if (gallerySrt) {
      gallery = JSON.parse(gallerySrt);
    }
    gallery = [...gallery, galleryItem];

    localStorage.setItem(`gallery-${userName}`, JSON.stringify(gallery));
  }

  saveProfile(profileUrl: string, userName: string) {
    localStorage.setItem(`profile-${userName}`, profileUrl);
  }

  getProfile(userName: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(`profile-${userName}`) || '';
    } else {
      return '';
    }
  }
}
