import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../data-access/users.service';
import {
  IUserList,
  IUserProfile,
} from '../../shared/interfaces/user.interface';
import { Store } from '../../store/store';
import { S3UploaderService, ImageResizeService } from '../../shared/data-access/s3.service';
import { constants } from '../../global';
import {truncateText} from '../../utils/stringManager'
import { elapsedTime } from '../../utils/timeManager';
import { PostCardComponent } from "../../post/post-card/post-card.component";
import { CheckedIconComponent } from "../utils/checked-icon/checked-icon.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PostCardComponent, CheckedIconComponent],
  templateUrl: './profile.component.html',
  styles: ``,
  providers: [UsersService],
})
export default class ProfileComponent implements OnInit {
  private subscription: Subscription | undefined;

  isFollowing = false;

  truncateDescription = truncateText
  postDate = elapsedTime

  loadingPosts = false
  queryExecuted = false


/* condition = false */

  //Carga nuevos posts cuando se hace scroll hasta la penultima fila
  onScroll(event :any){
    const element = event.target as HTMLElement;
   /*  console.log('scroll height', element.scrollHeight)
    console.log('scroll top', element.scrollTop)
    console.log('client heigth', element.clientHeight) */
    /* const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight; */
   /*  console.log('diff', element.scrollHeight - element.scrollTop) */
    const atBottom = element.scrollHeight - element.scrollTop < element.clientHeight+500;

    if (atBottom && !this.queryExecuted ) {
      console.log('Llegaste al final del contenedor');
      
      this.loadingPosts  = true
      this.queryExecuted = true

     //TODO realizar consulta con paginacion a la base de datos
     //Enviar username, startkey

     this.queryExecuted = false
    }
  }

 

    @HostListener('scroll', ['$event'])
    onWindowScroll(event: Event): void {
      const scrollPosition = window.scrollY;
      console.log('Posición del scroll:', scrollPosition);
      
      // Puedes agregar lógica aquí para manipular la UI según la posición del scroll
      if (scrollPosition > 50) {
        // Cambiar el estilo o realizar una acción
      }
    }

 

  user: IUserProfile = {
    username: '',
    fullname: '',
    photoUrl: '',
    followers: 0,
    following: 0,
    postCounter: 0,
    posts: [],
    lastPostKey: ''
  };

  constructor(
    private route: ActivatedRoute,
    private s3Uploader: S3UploaderService,
    private imageResizer: ImageResizeService
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

  photoUrl: string | ArrayBuffer | null = '';

  async uploadFile(selectedFile: File) {
    if (selectedFile) {

      //Se modifican las dimensiones de la imagen
      const resizedFile = await this.imageResizer.resizeImage(selectedFile,400,400) as File

      console.log('Normal Image')
      console.log(selectedFile.size)

      console.log('Image resized')
      console.log(resizedFile.size)

      this.user.photoUrl = '';
      this.isLoadingPhoto = true;
      this.s3Uploader
        .uploadFile(resizedFile, this.profile)
        .then((url) => {

          //se guarda la URL en la base de datos

        this.usersService.updateProfilePhoto(url).subscribe({
          next: (response)=>{
            console.log(response)
            this.user.photoUrl = url;
            this.isLoadingPhoto = false;
          },
          error:(err)=>{
            console.log(err)
            this.isLoadingPhoto = false;
          }
        })
   
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

  textoFormateado = ''

  // Cargar los datos al acceder al perfil del usuario -------------------------------------------------
  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      const usernameParam = params.get('username') || '';

      this.isLoading = true;

      //Peticion HTTP GET para obtener el perfil del usuario
      this.usersService.getUserProfile(usernameParam).subscribe({
        next: (response: any) => {

          console.log('respuesta',response.user)
 
          this.user = response.user;
          this.textoFormateado = this.truncateDescription("cloy \ncloy\ncloy\ncloy \ncloy\n\ncloy",75)
         /*  this.textoFormateado = this.mostrarDescription('asasa\n\nsasa\n\n      andres\n\n\nsasasa') */
          console.log('texto formateado',this.textoFormateado)
          this.isFollowing = response.isFollowing;
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
