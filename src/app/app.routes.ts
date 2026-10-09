import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { Faq } from './faq/faq';

import { QuoteList } from './quotes/pages/quote-list/quote-list';
import { QuoteWizard } from './quotes/pages/quote-wizard/quote-wizard';
import { QuoteDetails } from './quotes/pages/quote-details/quote-details';

export const routes: Routes = [
{
path: '',
redirectTo: 'dashboard',
pathMatch: 'full'
},
{
path: 'dashboard',
component: Dashboard
},
{
path: 'quotes',
component: QuoteList
},
{
path: 'faq',
component: Faq
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
