import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Store } from '../../store/store';

@Component({
  selector: 'app-new-post-form',
  standalone: true,
  imports: [],
  templateUrl: './new-post-form.component.html',
  styles: ``,
})
export default class NewPostFormComponent implements OnInit, OnDestroy {
  constructor(private route: Router) {}

  store = inject(Store);

  //Ocultar el boton al abrir el formulario de nuevo post
  ngOnInit(): void {
    this.store.hideFloatingButton(true);
  }

  //Mostrar el boton al cerrar el formulario
  ngOnDestroy(): void {
    this.store.hideFloatingButton(false);
  }
}
