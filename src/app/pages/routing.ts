import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: 'scan',
    loadChildren: () => import('../core/plugins/reader/components/barcode-scanning/barcode-scanning.module').then((m) => m.BarcodeScanningModule),
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then((m) => m.InfoPageModule),
  },
  {
    path: 'merchant-settings',
    loadChildren: () => import('./merchant-settings/merchant-settings.module').then((m) => m.MerchantSettingsPageModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then((m) => m.PasswordPageModule),
    // data: { layout: 'dark-header' },
  },
  {
    path: 'region',
    loadChildren: () => import('./region/region.module').then((m) => m.RegionPageModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'lang',
    loadChildren: () => import('./select-lang/select-lang.module').then((m) => m.SelectLangPageModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsPageModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'show-qr',
    loadChildren: () => import('./show-qr/show-qr.module').then((m) => m.ShowQrPageModule),
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then((m) => m.TicketsPageModule),
  },
  {
    path: 'zones',
    loadChildren: () => import('./zones/zones.module').then((m) => m.ZonesPageModule),
  },
  
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
