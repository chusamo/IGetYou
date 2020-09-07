import { Injectable } from "@angular/core";
import { Settings, Platform } from './settings.model'

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private settings : Settings
  constructor() {}

  saveName(name) {
    this.settings.name = name
  }
  saveSocialPlatform(social) {
    this.settings.social = social
  }
  getSettings(){
    return this.settings
  }

  getQrData() {
    let json = {}
    this.settings.social.forEach(element => {
      json[element.platform] = element.value
    });
    return JSON.stringify(json)
  }
  scanData(){
    return JSON.parse(JSON.stringify(this.settings))
  }

}
