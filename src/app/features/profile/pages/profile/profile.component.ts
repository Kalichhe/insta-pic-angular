import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { PostsService } from '../../../posts/services/posts.service';
import { UserService } from '../../../../auth/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  uploadedUrl: string = '';
  user;
  constructor(
    private postsService: PostsService,
    private userService: UserService
  ) {
    this.user = userService.getUser();
  }

  onUploadPhoto(event: Event) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileName = uuidv4();
    const input = event.target as HTMLInputElement;
    if (input.files!.length <= 0) {
      return;
    }
    const file: File = input.files![0];
    this.postsService
      .uploadFile(file, this.user().userName, fileName, 'profile')
      .then((response) => {
        this.uploadedUrl = response;
        this.userService.saveProfile(this.uploadedUrl, this.user().userName);
        Swal.close();
      })
      .catch((error) => {
        Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
      });
  }
}
