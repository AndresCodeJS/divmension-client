import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { IUserList } from '../../interfaces/user.interface';

@Component({
  selector: 'app-search-bar-drop-down',
  standalone: true,
  imports: [],
  templateUrl: './search-bar-drop-down.component.html',
  styles: ``
})
export class SearchBarDropDownComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {
    // Listener global para clics fuera del componente
    this.renderer.listen('document', 'click', (event: Event) => {
      this.onDocumentClick(event);
    });
  }

  //Evento que cierra la lista de coincidencias al hacer click fuera de la lista ----------------------------
  @Input() closeSearchList = true;

  @Input() notFound = false // se usa para mostrar el aviso de que no se encontraron coincidencias

  @Output() closeSearchBarEmitter = new EventEmitter<boolean>();

  //Carga la lista e usuarios
  @Input() userList:IUserList[] = [{
    username: '',
    fullname: '',
    photoUrl: ''
  }]

  onClickSearchResult(){
    console.log('se selecciono una opcion')
    this.closeSearchBarEmitter.emit(false)
  }

  onDocumentClick(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      console.log('click fuera de la lista')
      this.closeSearchBarEmitter.emit(false)
    }
  }

  // -------------------------------------------------------------------------------------------------------

}

