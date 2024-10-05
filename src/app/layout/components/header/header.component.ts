import { Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user;
  constructor(private readonly router:Router, private readonly userService:UserService){
    this.user = userService.getUser();
  }


  logout(){
    this.userService.logout();
    this.user = this.userService.getUser();
    this.router.navigateByUrl('');
  }

}
