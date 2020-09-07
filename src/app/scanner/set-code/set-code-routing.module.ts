import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetCodePage } from './set-code.page';

const routes: Routes = [
  {
    path: '',
    component: SetCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetCodePageRoutingModule {}
