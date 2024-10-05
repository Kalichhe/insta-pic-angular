import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../../../auth/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  uploadedUrl: string = '';
  user;
  constructor(
    private postsService: PostsService,
    private userService: UserService
  ) {
    this.user = userService.getUser();
  }

  onUpload(event: Event) {
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
      .uploadFile(file, this.user().userName, fileName, 'restly')
      .then((response) => {
        this.uploadedUrl = response;
        this.userService.saveGalleryItem(
          { id: fileName, url: this.uploadedUrl, comments: [] },
          this.user().userName
        );
        Swal.close();
      })
      .catch((error) => {
        Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
      });
  }
}
