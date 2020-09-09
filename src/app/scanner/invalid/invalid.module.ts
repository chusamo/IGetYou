import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvalidPageRoutingModule } from './invalid-routing.module';

import { InvalidPage } from './invalid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvalidPageRoutingModule
  ],
  declarations: [InvalidPage]
})
export class InvalidPageModule {}
