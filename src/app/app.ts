import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';
import { LeftMenu } from './shared/components/left-menu/left-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, LeftMenu, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
