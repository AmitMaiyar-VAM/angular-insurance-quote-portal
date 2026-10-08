import { Routes } from '@angular/router';

import { QuoteWizard } from './quotes/pages/quote-wizard/quote-wizard';
import { QuoteDetails } from './quotes/pages/quote-details/quote-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'quotes',
    pathMatch: 'full'
  },
  {
    path: 'quotes/wizard/:id',
    component: QuoteWizard
  },
  {
    path: 'quotes/wizard',
    component: QuoteWizard,
    pathMatch: 'full'
  },
  {
    path: 'quotes/details/:id',
    component: QuoteDetails
  }
];