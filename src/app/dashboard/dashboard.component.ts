import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/ui/navbar/header.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

}
