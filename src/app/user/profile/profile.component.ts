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
import { constants } from '../../global';

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

  constructor(
    private route: ActivatedRoute,
    private s3Uploader: S3UploaderService
  ) {}

  isLoading = false;
  isLoadingPhoto = false;
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

  async onFileSelected(event: any) {
    if (event.target) {
      if (event.target.files.length) {
        if (event.target.files[0].type.match(/image\/*/)) {
          // solo imagenes
          let selectedFile = event.target.files[0] as File;
          console.log('se cargo un archivo');
          await this.uploadFile(selectedFile);
        } else {
          this.selectedFile = null;
        }
      }
    }
  }

  triggerFileInput() {
    // Obtiene una referencia al input de archivo
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    // Simula un clic en el input de archivo
    fileInput.click();
  }

  profile = constants.PROFILE;

  photoUrl: string | ArrayBuffer | null = '/sin-perfil.jpg'

  async uploadFile(selectedFile: File) {
    if (selectedFile) {
      this.isLoadingPhoto = true;
      this.s3Uploader
        .uploadFile(selectedFile, this.profile)
        .then((url) => {
          console.log('se cargo la foto');
          /* this.photoUrl = url */
          console.log(url);
          this.isLoadingPhoto = false;

          // Almacena la imagen en photoUrl para mostrarla localmente pues como no se ha recargado la pagina ...
          // no se muestra la url almacenada en los datos del usuario
          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
            this.photoUrl = e.target?.result || '/sin-perfil.jpg'
          };

          reader.readAsDataURL(selectedFile)
        })
        .catch((error) => {
          console.log(error);
          this.isLoadingPhoto = false;
        });

      /*    if(response?.photoUrl){
        console.log('se cargo la foto')
        console.log(response.photoUrl)
      }
      
      this.isLoadingPhoto = false */
    } else {
      console.log('no hay archivo');
    }
  }
  // Cargar los datos al acceder al perfil del usuario -------------------------------------------------
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
