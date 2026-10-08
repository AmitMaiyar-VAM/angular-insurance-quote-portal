import { Injectable } from '@angular/core';

import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private storageKey = 'quotes';

  constructor() {
    this.initializeSampleQuotes();
  }

  getQuotes(): Quote[] {
    const data = localStorage.getItem(this.storageKey);

    return data ? JSON.parse(data) : [];
  }

  getQuoteById(id: string): Quote | undefined {
    const quotes = this.getQuotes();

    return quotes.find((quote) => quote.id === id);
  }

  saveQuote(quote: Quote): void {
    const quotes = this.getQuotes();

    const existingIndex = quotes.findIndex((existingQuote) => existingQuote.id === quote.id);

    if (existingIndex >= 0) {
      quotes[existingIndex] = quote;
    } else {
      quotes.push(quote);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(quotes));
  }

  deleteQuote(id: string): void {
    const quotes = this.getQuotes();

    const updatedQuotes = quotes.filter((quote) => quote.id !== id);

    localStorage.setItem(this.storageKey, JSON.stringify(updatedQuotes));
  }

  private initializeSampleQuotes(): void {
    const existingQuotes = localStorage.getItem(this.storageKey);

    if (existingQuotes) {
      return;
    }

    const sampleQuotes: Quote[] = [
      {
        id: 'CP-10001',
        productType: 'CP',
        status: 'Incomplete',
        currentStep: 2,

        businessInfo: {
          businessName: 'ABC Manufacturing Pvt Ltd',
          businessType: 'Manufacturing',
          contactPerson: 'John Smith',
          email: 'john.smith@example.com',
          phone: '9876543210',
          address: '25 Industrial Area',
          city: 'Hyderabad',
          state: 'Telangana',
          zipCode: '500001',
        },

        propertyInfo: {
          propertyType: 'Commercial Building',
          propertyAddress: '25 Industrial Area',
          yearBuilt: 2018,
          buildingArea: 25000,
          numberOfFloors: 3,
          constructionType: 'Concrete',
          occupancyType: 'Manufacturing',
        },

        coverageInfo: {
          buildingCoverage: 5000000,
          businessPersonalProperty: 1000000,
          equipmentCoverage: 750000,
          businessInterruptionCoverage: 500000,
          generalLiabilityCoverage: 2000000,
          deductible: 10000,
        },

        createdAt: '2026-10-01T10:30:00',
        updatedAt: '2026-10-03T14:20:00',
      },

      {
        id: 'CP-10002',
        productType: 'CP',
        status: 'Completed',
        currentStep: 5,

        businessInfo: {
          businessName: 'Sunrise Retail Stores',
          businessType: 'Retail',
          contactPerson: 'Sarah Johnson',
          email: 'sarah.johnson@example.com',
          phone: '9988776655',
          address: '18 Main Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          zipCode: '560001',
        },

        propertyInfo: {
          propertyType: 'Retail Store',
          propertyAddress: '18 Main Road',
          yearBuilt: 2015,
          buildingArea: 12000,
          numberOfFloors: 2,
          constructionType: 'Brick',
          occupancyType: 'Retail',
        },

        coverageInfo: {
          buildingCoverage: 3500000,
          businessPersonalProperty: 750000,
          equipmentCoverage: 300000,
          businessInterruptionCoverage: 250000,
          generalLiabilityCoverage: 1500000,
          deductible: 5000,
        },

        createdAt: '2026-09-25T09:15:00',
        updatedAt: '2026-10-02T16:45:00',
      },
    ];

    localStorage.setItem(this.storageKey, JSON.stringify(sampleQuotes));
  }
}
