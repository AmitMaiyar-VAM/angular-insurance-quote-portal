import { Routes } from '@angular/router';

import { QuoteWizard } from './quotes/pages/quote-wizard/quote-wizard';
import { QuoteDetails } from './quotes/pages/quote-details/quote-details';
import { QuoteList } from './quotes/pages/quote-list/quote-list';

export const routes: Routes = [
  {
    path: '',
    component: QuoteList,
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
