import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {}
