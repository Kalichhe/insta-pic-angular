import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../../auth/services/user.service';
import { GalleryItem } from '../../../posts/interfaces/gallery-item.inteface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  posts = signal(10);
  followers = 5;
  requests = 150;
  galleryItems = signal<GalleryItem[]>([]);

  user;
  profilePhoto = '';

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
    this.galleryItems.set(this.userService.getGallery(this.user().userName));
    this.profilePhoto = this.userService.getProfile(this.user().userName);
  }

  onComment(comments: string[]) {
    let htmlContent = 'Aún no hay comentarios, se el primero!';
    if (comments.length > 0) {
      htmlContent = '<div>';
      comments.forEach((comment) => {
        htmlContent += `<p>${comment}</p>`;
      });
      htmlContent += '</div>';
    }
    Swal.fire({
      html: htmlContent,
    });
  }

  onDelete(id: string) {
    Swal.fire({
      text: '¿Está seguro de eliminar la imagen seleccionada?',
      icon: 'warning',
      iconColor: '#219ebc',
      showCancelButton: true,
      confirmButtonColor: '#023047',
      cancelButtonColor: '#d00000',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.galleryItems.update((items) =>
          items.filter((item) => item.id !== id)
        );
        this.userService.updateGallery(
          this.user().userName,
          this.galleryItems()
        );
        this.posts.update(() => this.galleryItems().length);
      }
    });
  }

  onAddComment(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
    if (!input.value) {
      return;
    }
    this.galleryItems.update((items) => {
      let selected = items.find((item) => item.id === id);
      if (selected) {
        selected.comments = [...selected.comments, input.value];
      }
      return items;
    });
    this.userService.updateGallery(this.user().userName, this.galleryItems());
    input.value = '';
  }
}
