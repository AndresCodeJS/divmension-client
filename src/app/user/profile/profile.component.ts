import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../data-access/users.service';
import { IUserList } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styles: ``,
  providers: [UsersService]
})
export default class ProfileComponent implements OnInit {

  private subscription: Subscription | undefined;

  user: IUserList = {
    username: '',
    fullname: '',
    photoUrl: ''
  }

  constructor(private route: ActivatedRoute){
  }

  isLoading = false

  userNotFound = false

  private usersService = inject(UsersService);

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const usernameParam = params.get('username') || '';

      this.isLoading = true

      //Peticion HTTP GET para obtener el perfil del usuario
      this.usersService.getUserProfile(usernameParam).subscribe({
        next: (response: any) => {
          this.user = response.user
          console.log('el usuario obtenido es:'+this.user.fullname)

          this.isLoading = false
        },
        error: (error: HttpErrorResponse) => {
          this.userNotFound = true
          this.isLoading = false
        },
      });
    });

  }



}
