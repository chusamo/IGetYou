import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetCodePageRoutingModule } from './set-code-routing.module';

import { SetCodePage } from './set-code.page';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetCodePageRoutingModule,
    QRCodeModule,

  ],
  declarations: [SetCodePage]
})
export class SetCodePageModule {}
