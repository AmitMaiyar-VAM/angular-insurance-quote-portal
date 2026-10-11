import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

import { Quote } from '../quotes/models/quote.model';
import { QuoteService } from '../quotes/services/quote.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, RouterLink, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  quotes: Quote[] = [];

  constructor(
    private quoteService: QuoteService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quotes = this.quoteService
      .getQuotes()
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime(),
      );
  }

  get recentQuotes(): Quote[] {
    return this.quotes.slice(0, 3);
  }

  get completedQuotes(): number {
    return this.quotes.filter(q => q.status === 'Completed').length;
  }

  get incompleteQuotes(): number {
    return this.quotes.filter(q => q.status === 'Incomplete').length;
  }

  get totalQuotes(): number {
    return this.quotes.length;
  }

  get completedPercentage(): number {
    return this.totalQuotes
      ? Math.round((this.completedQuotes / this.totalQuotes) * 100)
      : 0;
  }

  get incompletePercentage(): number {
    return this.totalQuotes
      ? 100 - this.completedPercentage
      : 0;
  }

  openQuote(quote: Quote): void {
    if (quote.status === 'Completed') {
      this.router.navigate(['/quotes/details', quote.id]);
    } else {
      this.router.navigate(['/quotes/wizard', quote.id]);
    }
  }
}