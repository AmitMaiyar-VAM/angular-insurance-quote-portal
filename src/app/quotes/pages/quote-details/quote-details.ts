import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Quote } from '../../models/quote.model';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './quote-details.html',
  styleUrl: './quote-details.css',
})
export class QuoteDetails {

  quote: Quote | undefined;

  constructor(
    private route: ActivatedRoute,
    private quoteService: QuoteService,
    private router: Router
  ) {
    const quoteId = this.route.snapshot.paramMap.get('id');

    if (quoteId) {
      this.quote = this.quoteService.getQuoteById(quoteId);
    }
  }

  goToQuotes(): void {
    this.router.navigate(['/quotes']);
  }

}