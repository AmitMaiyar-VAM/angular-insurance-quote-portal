import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SideMenu } from './shared/components/side-menu/side-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, SideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
