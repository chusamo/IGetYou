import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../../settings/settings.service";
@Component({
  selector: 'app-set-code',
  templateUrl: './set-code.page.html',
  styleUrls: ['./set-code.page.scss'],
})
export class SetCodePage implements OnInit {
  qrData: any;
  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.qrData = this.settingsService.getQrData()
    console.log(this.qrData)
  }

}
