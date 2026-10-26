import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { Quote } from '../../models/quote.model';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './quote-details.html',
  styleUrl: './quote-details.css'
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

  get coverageTotal(): number {
    if (!this.quote) return 0;

    const c = this.quote.coverageInfo;

    return (
      Number(c.buildingCoverage || 0) +
      Number(c.businessPersonalProperty || 0) +
      Number(c.equipmentCoverage || 0) +
      Number(c.businessInterruptionCoverage || 0) +
      Number(c.generalLiabilityCoverage || 0)
    );
  }
}