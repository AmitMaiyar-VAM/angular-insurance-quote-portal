import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { Faq } from './faq/faq';
import { QuoteList } from './quotes/pages/quote-list/quote-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'dashboard',
    component: Dashboard,
  },

  {
    path: 'quotes',
    component: QuoteList,
  },

  {
    path: 'faq',
    component: Faq,
  },
];
