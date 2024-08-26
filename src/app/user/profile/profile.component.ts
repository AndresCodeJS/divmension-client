import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../data-access/users.service';
import {
  IUserList,
  IUserProfile,
} from '../../shared/interfaces/user.interface';
import { Store } from '../../store/store';
import { S3UploaderService } from '../../shared/data-access/s3.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styles: ``,
  providers: [UsersService],
})
export default class ProfileComponent implements OnInit {
  private subscription: Subscription | undefined;

  isFollowing = false;

  user: IUserProfile = {
    username: '',
    fullname: '',
    photoUrl: '',
    followers: 0,
    following: 0,
    posts: 0,
  };

  constructor(private route: ActivatedRoute, private s3Uploader: S3UploaderService) {}

  isLoading = false;
  userNotFound = false;

  private usersService = inject(UsersService);

  store = inject(Store); //Inyeccion del store global

  //Seguir a usuario ----------------------------------------
  followUser() {
    this.usersService.followUser(this.user.username).subscribe({
      next: (response) => {
        console.log(response);
        this.isFollowing = true;
        this.user.followers = response.followers;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //Dejar de seguir usuario ---------------------------------
  unfollowUser() {
    this.usersService.unfollowUser(this.user.username).subscribe({
      next: (response) => {
        console.log(response);
        this.isFollowing = false;
        this.user.followers = response.followers;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //Subir Foto de perfil ----------------------------------------------

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    if (event.target) {
      if (event.target.files.length) {
        this.selectedFile = event.target.files[0] as File;
        console.log('se cargo un archivo')
      }
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.s3Uploader.uploadFile(this.selectedFile)
        .then(url => {
          console.log('Archivo subido exitosamente:', url);
          // Aquí puedes guardar la URL en tu base de datos o hacer lo que necesites
        })
        .catch(err => {
          console.error('Error al subir el archivo:', err);
        });
    }
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      const usernameParam = params.get('username') || '';

      this.isLoading = true;

      //Peticion HTTP GET para obtener el perfil del usuario
      this.usersService.getUserProfile(usernameParam).subscribe({
        next: (response: any) => {
          this.user = response.user;
          this.isFollowing = response.isFollowing;

          console.log('Sigue al usuario' + response.isFollowing);

          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.userNotFound = true;
          this.isLoading = false;
        },
      });
    });
  }
}
