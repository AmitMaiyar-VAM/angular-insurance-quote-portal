import { Injectable } from '@angular/core';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private storageKey = "quotes";

  getQuotes(): Quote[]{
    const data = localStorage.getItem(this.storageKey);

    return data ? JSON.parse(data) : [];
}

getQuoteById(id: string): Quote | undefined {
  const quotes = this.getQuotes();
  return quotes.find(quote => quote.id === id);
  
}

saveQuote(quote: Quote): void {
  const quotes = this.getQuotes();
  const existingIndex = quotes.findIndex(
      existingQuote => existingQuote.id === quote.id
    );

    if (existingIndex >= 0) { 
      quotes[existingIndex] = quote;
    } else {
      quotes.push(quote);
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(quotes));

}

deleteQuote(id: string): void {
  const quotes = this.getQuotes();
  const updatedQuotes = quotes.filter(quote => quote.id !== id);
  localStorage.setItem(this.storageKey, JSON.stringify(updatedQuotes));


}}