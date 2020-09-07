import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../../settings/settings.service";


@Component({
  selector: 'app-scan-code',
  templateUrl: './scan-code.page.html',
  styleUrls: ['./scan-code.page.scss'],
})
export class ScanCodePage implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
  }
  
  scanCode(){
    console.log(this.settingsService.scanData())
  }

}
