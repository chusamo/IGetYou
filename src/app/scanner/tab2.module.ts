import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab2Page } from "./tab2.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { Tab2PageRoutingModule } from "./tab2-routing.module";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { QRCodeModule } from 'angular2-qrcode';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    QRCodeModule,
  ],
  providers: [BarcodeScanner],
  declarations: [Tab2Page],
})
export class Tab2PageModule {}
