import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';

import { Quote } from '../../models/quote.model';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote-wizard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './quote-wizard.html',
  styleUrl: './quote-wizard.css',
})
export class QuoteWizard {
  businessForm: FormGroup;
  propertyForm: FormGroup;
  coverageForm: FormGroup;

  private quoteId: string | null = null;

  savedStep = 0;
  saveMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.businessForm = this.fb.group({
      businessName: ['', Validators.required],
      businessType: ['', Validators.required],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]],
    });

    this.propertyForm = this.fb.group({
      propertyType: ['', Validators.required],
      propertyAddress: ['', Validators.required],
      yearBuilt: [
        '',
        [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())],
      ],
      buildingArea: ['', [Validators.required, Validators.min(1)]],
      numberOfFloors: ['', [Validators.required, Validators.min(1)]],
      constructionType: ['', Validators.required],
      occupancyType: ['', Validators.required],
    });

    this.coverageForm = this.fb.group({
      buildingCoverage: ['', [Validators.required, Validators.min(1)]],
      businessPersonalProperty: ['', [Validators.required, Validators.min(1)]],
      equipmentCoverage: ['', Validators.min(0)],
      businessInterruptionCoverage: ['', Validators.min(0)],
      generalLiabilityCoverage: ['', [Validators.required, Validators.min(1)]],
      deductible: ['', [Validators.required, Validators.min(0)]],
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadQuote(id);
    }
  }

  private loadQuote(id: string): void {
    const quote = this.quoteService.getQuoteById(id);

    if (!quote) {
      this.errorMessage = 'Quote not found. Please return to the Quote List.';
      return;
    }

    this.quoteId = quote.id;
    this.businessForm.patchValue(quote.businessInfo);
    this.propertyForm.patchValue(quote.propertyInfo);
    this.coverageForm.patchValue(quote.coverageInfo);

    this.savedStep = Math.max(0, quote.currentStep - 1);
  }

  saveProgress(): void {
    const existingQuote = this.quoteId ? this.quoteService.getQuoteById(this.quoteId) : undefined;

    const quote: Quote = {
      id: this.quoteId ?? this.generateQuoteId(),
      productType: 'CP',
      status: 'Incomplete',
      currentStep: this.getCurrentStep(),
      businessInfo: this.businessForm.getRawValue(),
      propertyInfo: this.propertyForm.getRawValue(),
      coverageInfo: this.coverageForm.getRawValue(),
      createdAt: existingQuote?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.quoteId = quote.id;
    this.quoteService.saveQuote(quote);

    this.saveMessage = 'Progress saved successfully.';
    this.errorMessage = '';
  }

  submitQuote(): void {
    this.businessForm.markAllAsTouched();
    this.propertyForm.markAllAsTouched();
    this.coverageForm.markAllAsTouched();

    if (this.businessForm.invalid || this.propertyForm.invalid || this.coverageForm.invalid) {
      this.errorMessage = 'Please complete all required fields and correct any invalid values.';
      this.saveMessage = '';
      return;
    }

    const existingQuote = this.quoteId ? this.quoteService.getQuoteById(this.quoteId) : undefined;

    const quote: Quote = {
      id: this.quoteId ?? this.generateQuoteId(),
      productType: 'CP',
      status: 'Completed',
      currentStep: 4,
      businessInfo: this.businessForm.getRawValue(),
      propertyInfo: this.propertyForm.getRawValue(),
      coverageInfo: this.coverageForm.getRawValue(),
      createdAt: existingQuote?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.quoteService.saveQuote(quote);

    this.router.navigate(['/quotes/details', quote.id]);
  }

  private generateQuoteId(): string {
    return 'CP-' + Date.now();
  }

  private getCurrentStep(): number {
    if (this.businessForm.invalid) return 1;
    if (this.propertyForm.invalid) return 2;
    if (this.coverageForm.invalid) return 3;

    return 4;
  }
}
