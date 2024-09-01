import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Store } from '../../store/store';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-post-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-post-form.component.html',
  styles: ``,
})
export default class NewPostFormComponent implements OnInit, OnDestroy {
  constructor(private route: Router) {}

  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    photo: this.fb.control('', {
      validators: [Validators.required],
    }),
    description: this.fb.control('', {
      validators: [Validators.required],
    }),
  });

  get photo() {
    return this.form.get('photo') as FormControl;
  }

  get description() {
    return this.form.get('description') as FormControl;
  }

  //Registro de errores cuando el usuario o password son incorrectos ------------------------------
/*   errors = {
    username: false,
    password: false,
  }; */

  onKeyDown() {
  /*   this.errors.username = false;
    this.errors.password = false; */
  }

  //-----------------------------------------------------------------------------------------------

  store = inject(Store);

  isLoading = false;

  //Ocultar el boton al abrir el formulario de nuevo post ----------------------------------------
  ngOnInit(): void {
    this.store.hideFloatingButton(true);
  }

  //Mostrar el boton al cerrar el formulario -----------------------------------------------------
  ngOnDestroy(): void {
    this.store.hideFloatingButton(false);
  }

  // CARGA DE IMAGEN --------------------------------------------------------------------
  selectedFile: File | null = null;

  imageUrl: string | ArrayBuffer | null = null;

  async onFileSelected(event: any) {
    if (event.target) {
      if (event.target.files.length) {
        if (event.target.files[0].type.match(/image\/*/)) {
          // solo imagenes
          let selectedFile = event.target.files[0] as File;

          //Cargar la imagen para mostrarla
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            this.imageUrl = e.target?.result || null;
          };
          reader.readAsDataURL(selectedFile);
          
          /* await this.uploadFile(selectedFile); */
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

  onSubmit() {}
}
