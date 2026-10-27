
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';

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
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
  ],
  templateUrl: './quote-wizard.html',
  styleUrl: './quote-wizard.css',
})
export class QuoteWizard {
  businessForm: FormGroup;
  propertyForm: FormGroup;
  coverageForm: FormGroup;
  riskForm: FormGroup;
  additionalForm: FormGroup;

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
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)],
      ],
    });

    this.propertyForm = this.fb.group({
      propertyType: ['', Validators.required],
      propertyAddress: ['', Validators.required],
      yearBuilt: [
        '',
        [
          Validators.required,
          Validators.min(1800),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      buildingArea: ['', [Validators.required, Validators.min(1)]],
      numberOfFloors: ['', [Validators.required, Validators.min(1)]],
      constructionType: ['', Validators.required],
      occupancyType: ['', Validators.required],
    });

    this.coverageForm = this.fb.group({
      buildingCoverage: ['', [Validators.required, Validators.min(1)]],
      businessPersonalProperty: [
        '',
        [Validators.required, Validators.min(1)],
      ],
      equipmentCoverage: [0, [Validators.required, Validators.min(0)]],
      businessInterruptionCoverage: [
        0,
        [Validators.required, Validators.min(0)],
      ],
      generalLiabilityCoverage: [
        '',
        [Validators.required, Validators.min(1)],
      ],
      deductible: ['', [Validators.required, Validators.min(0)]],
    });

    this.riskForm = this.fb.group({
      hasFireAlarm: [false],
      hasSprinklers: [false],
      hasSecuritySystem: [false],
      hasFireExtinguishers: [false],
      priorClaims: ['', Validators.required],
      claimsDetails: [''],
      riskNotes: [''],
    });

    this.additionalForm = this.fb.group({
      effectiveDate: [null, Validators.required],
      priorInsurance: ['', Validators.required],
      previousInsurer: [''],
      additionalInterests: [''],
      declarationsAccepted: [false, Validators.requiredTrue],
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadQuote(id);
    }
  }

  private getStepForms(): FormGroup[] {
    return [
      this.businessForm,
      this.propertyForm,
      this.coverageForm,
      this.riskForm,
      this.additionalForm,
    ];
  }

  private loadQuote(id: string): void {
    const quote = this.quoteService.getQuoteById(id);

    if (!quote) {
      this.errorMessage =
        'Quote not found. Please return to the Quote List.';
      return;
    }

    this.quoteId = quote.id;

    this.businessForm.patchValue(quote.businessInfo);
    this.propertyForm.patchValue(quote.propertyInfo);
    this.coverageForm.patchValue(quote.coverageInfo);

    // Support older quotes without these sections.
    this.riskForm.patchValue(quote.riskInfo ?? {});
    this.additionalForm.patchValue(quote.additionalInfo ?? {});

    const effectiveDate = quote.additionalInfo?.effectiveDate;

    if (effectiveDate) {
      this.additionalForm.patchValue({
        effectiveDate: new Date(effectiveDate),
      });
    }

    // Stored step is 1-based; Material selectedIndex is 0-based.
    this.savedStep = Math.min(
      5,
      Math.max(0, (quote.currentStep ?? 1) - 1),
    );
  }

  /**
   * Shared Next/Review action for steps 1–5.
   * Validates the current form, saves the draft,
   * then moves to the next step.
   */
  continueCurrentStep(stepper: MatStepper): void {
    const currentForm = this.getStepForms()[stepper.selectedIndex];

    if (!currentForm) {
      return;
    }

    currentForm.markAllAsTouched();

    if (currentForm.invalid) {
      this.errorMessage =
        'Please complete the required fields correctly before continuing.';
      this.saveMessage = '';
      return;
    }

    // Save the step that the user will resume on.
    this.saveDraft(stepper.selectedIndex + 2);

    stepper.next();
  }

  /**
   * Shared Back action.
   * Saves the current data and records the step being returned to.
   */
  goBack(stepper: MatStepper): void {
    if (stepper.selectedIndex === 0) {
      return;
    }

    this.saveDraft(Math.max(1, stepper.selectedIndex));
    stepper.previous();
  }

  private saveDraft(currentStep: number): void {
    const existingQuote = this.quoteId
      ? this.quoteService.getQuoteById(this.quoteId)
      : undefined;

    const effectiveDate = this.additionalForm.value.effectiveDate;

    const additionalInfo = {
      ...this.additionalForm.getRawValue(),
      effectiveDate: effectiveDate
        ? new Date(effectiveDate).toISOString()
        : '',
    };

    const quote: Quote = {
      id: this.quoteId ?? this.generateQuoteId(),
      productType: 'CP',
      status: 'Incomplete',
      currentStep,
      businessInfo: this.businessForm.getRawValue(),
      propertyInfo: this.propertyForm.getRawValue(),
      coverageInfo: this.coverageForm.getRawValue(),
      riskInfo: this.riskForm.getRawValue(),
      additionalInfo,
      createdAt: existingQuote?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.quoteId = quote.id;
    this.quoteService.saveQuote(quote);

    this.errorMessage = '';
    this.saveMessage = 'Progress saved automatically.';
  }

  submitQuote(): void {
    const forms = this.getStepForms();

    forms.forEach(form => form.markAllAsTouched());

    if (forms.some(form => form.invalid)) {
      this.errorMessage =
        'Please review all steps and correct the validation errors.';
      this.saveMessage = '';
      return;
    }

    const existingQuote = this.quoteId
      ? this.quoteService.getQuoteById(this.quoteId)
      : undefined;

    const effectiveDate = this.additionalForm.value.effectiveDate;

    if (!effectiveDate) {
      this.additionalForm.get('effectiveDate')?.markAsTouched();
      this.errorMessage = 'Please select an effective date.';
      return;
    }

    const additionalInfo = {
      ...this.additionalForm.getRawValue(),
      effectiveDate: new Date(effectiveDate).toISOString(),
    };

    const quote: Quote = {
      id: this.quoteId ?? this.generateQuoteId(),
      productType: 'CP',
      status: 'Completed',
      currentStep: 6,
      businessInfo: this.businessForm.getRawValue(),
      propertyInfo: this.propertyForm.getRawValue(),
      coverageInfo: this.coverageForm.getRawValue(),
      riskInfo: this.riskForm.getRawValue(),
      additionalInfo,
      createdAt: existingQuote?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.quoteService.saveQuote(quote);
    this.router.navigate(['/quotes/details', quote.id]);
  }

  private generateQuoteId(): string {
    return 'CP-' + Date.now();
  }
}
