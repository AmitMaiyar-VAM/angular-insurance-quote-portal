import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-quote-wizard',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './quote-wizard.html',
  styleUrl: './quote-wizard.css',
})
export class QuoteWizard {

  businessForm: FormGroup;
  propertyForm: FormGroup;
  coverageForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.businessForm = this.fb.group({
      businessName: ['', Validators.required],
      businessType: ['', Validators.required],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{5,6}$/)
      ]]
    });

    this.propertyForm = this.fb.group({
      propertyType: ['', Validators.required],
      propertyAddress: ['', Validators.required],
      yearBuilt: ['', [
        Validators.required,
        Validators.min(1800),
        Validators.max(new Date().getFullYear())
      ]],
      buildingArea: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      numberOfFloors: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      constructionType: ['', Validators.required],
      occupancyType: ['', Validators.required]
    });

    this.coverageForm = this.fb.group({
      buildingCoverage: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      businessPersonalProperty: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      equipmentCoverage: ['', Validators.min(0)],
      businessInterruptionCoverage: ['', Validators.min(0)],
      generalLiabilityCoverage: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      deductible: ['', [
        Validators.required,
        Validators.min(0)
      ]]
    });
  }

  saveProgress(): void {
    console.log('Save progress');
  }

  submitQuote(): void {

    if (
      this.businessForm.invalid ||
      this.propertyForm.invalid ||
      this.coverageForm.invalid
    ) {
      this.businessForm.markAllAsTouched();
      this.propertyForm.markAllAsTouched();
      this.coverageForm.markAllAsTouched();

      return;
    }

    console.log('Quote submitted');
  }
}
