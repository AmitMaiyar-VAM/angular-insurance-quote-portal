import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule],
  templateUrl: './left-menu.html',
  styleUrl: './left-menu.css',
})
export class LeftMenu {}
