import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
