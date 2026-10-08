import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AddQuoteDialog } from '../../components/add-quote-dialog/add-quote-dialog';
import { Quote } from '../../models/quote.model';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, DatePipe],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.css',
})
export class QuoteList implements OnInit {
  quotes: Quote[] = [];

  constructor(
    private quoteService: QuoteService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quotes = this.quoteService.getQuotes();
  }

  addQuote(): void {
    const dialogRef = this.dialog.open(AddQuoteDialog, {
      width: '520px',
      maxWidth: '90vw',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Selected business:', result);
      }
    });
  }

  viewQuote(id: string): void {
    console.log('View quote:', id);
  }

  resumeQuote(id: string): void {
    console.log('Resume quote:', id);
  }

  deleteQuote(id: string): void {
    this.quoteService.deleteQuote(id);
    this.loadQuotes();
  }

  get totalQuotes(): number {
    return this.quotes.length;
  }

  get incompleteQuotes(): number {
    return this.quotes.filter((quote) => quote.status === 'Incomplete').length;
  }

  get completedQuotes(): number {
    return this.quotes.filter((quote) => quote.status === 'Completed').length;
  }
}
