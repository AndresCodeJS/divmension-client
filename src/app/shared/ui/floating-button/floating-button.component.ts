import { Component, OnInit } from '@angular/core';
import {  RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter} from 'rxjs';

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './floating-button.component.html',
  styles: ``,
})
export default class FloatingButtonComponent implements OnInit {
  constructor(private route: Router) {
   
  }

 


  ngOnInit(): void {

  /*    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      console.log('hola')
    }); */
    
  }
 
}
