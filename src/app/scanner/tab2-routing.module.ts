import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'set-code',
    loadChildren: () => import('./set-code/set-code.module').then( m => m.SetCodePageModule)
  },
  {
    path: 'scan-code',
    loadChildren: () => import('./scan-code/scan-code.module').then( m => m.ScanCodePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
