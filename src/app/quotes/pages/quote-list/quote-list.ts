import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatCard } from '@angular/material/card';

import { AddQuoteDialog } from '../../components/add-quote-dialog/add-quote-dialog';
import { Quote } from '../../models/quote.model';
import { QuoteService } from '../../services/quote.service';
imports: [MatIconModule, MatDialogModule, DatePipe, MatCard]
@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatDialogModule, MatButtonModule, MatCardModule, MatTableModule, DatePipe],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.css',
})
export class QuoteList implements OnInit {
  readonly displayedColumns = ['quoteId', 'businessName', 'businessType', 'createdAt', 'status', 'actions'];
  quotes: Quote[] = [];

  constructor(
    private quoteService: QuoteService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quotes = this.quoteService.getQuotes();
  }

  addQuote(): void {
    const dialogRef = this.dialog.open(AddQuoteDialog);

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (!result) {
        return;
      }

      // This integration currently supports the CP flow.
      if (result !== 'CP' && result !== 'Commercial Property') {
        return;
      }

      const now = new Date().toISOString();

      const newQuote: Quote = {
        id: 'CP-' + Date.now(),
        productType: 'CP',
        status: 'Incomplete',
        currentStep: 1,

        businessInfo: {
          businessName: '',
          businessType: '',
          contactPerson: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
        },

        propertyInfo: {
          propertyType: '',
          propertyAddress: '',
          yearBuilt: 0,
          buildingArea: 0,
          numberOfFloors: 0,
          constructionType: '',
          occupancyType: '',
        },

        coverageInfo: {
          buildingCoverage: 0,
          businessPersonalProperty: 0,
          equipmentCoverage: 0,
          businessInterruptionCoverage: 0,
          generalLiabilityCoverage: 0,
          deductible: 0,
        },

        createdAt: now,
        updatedAt: now,
      };

      this.quoteService.saveQuote(newQuote);
      this.loadQuotes();

      this.router.navigate(['/quotes/wizard', newQuote.id]);
    });
  }

  viewQuote(id: string): void {
    this.router.navigate(['/quotes/details', id]);
  }

  resumeQuote(id: string): void {
    this.router.navigate(['/quotes/wizard', id]);
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
