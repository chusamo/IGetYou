import { Component } from "@angular/core";
import { SettingsService } from "../settings/settings.service";
import { ContactsService } from "../contacts/contacts.service";
import { Router } from "@angular/router";

import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  private dataScanned: any;
  private qrData: any;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private settingsService: SettingsService,
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.qrData = this.settingsService.getQrData();
  }

  ionViewWillEnter() {
    this.qrData = this.settingsService.getQrData();
  }
  scan() {
    this.dataScanned = null;
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.dataScanned = barcodeData.text;
        this.processScan(barcodeData.text);
      })
      .catch((err) => {
      });
  }
  processScan(data) {
    let json = {};
    try {
      let json = JSON.parse(data);
    } catch {
      this.router.navigate(["/tabs/scanner/invalid"]);
    }
    if (!this.checkValid(json)) {
      // redirigir a pestanya de error
      this.router.navigate(["/tabs/scanner/invalid"]);
    } else {
      // agregar contacto
      let idContact = this.contactsService.addContact(
        json["name"],
        json["social"]
      );
      let link = "/tabs/contacts/" + idContact;
      this.router.navigate([link]);
    }
  }

  checkValid(json) {
    return "name" in json && "social" in json;
  }
}
