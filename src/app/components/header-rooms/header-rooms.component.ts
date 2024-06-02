import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-rooms.component.html',
  styleUrl: './header-rooms.component.css'
})
export class HeaderRoomsComponent {
  hamburger: boolean = false;
  bypass: boolean = false;


  handleMenu() {
    this.hamburger = !this.hamburger;
  }
  handleBypass() {
    this.bypass = !this.bypass
    console.log("Entrou")
  }
}
