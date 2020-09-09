import { Injectable } from "@angular/core";
import { Settings } from "./settings.model";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private settings: Settings;

  constructor() {}

  saveName(name) {
    this.settings.name = name;
    window.localStorage.setItem("name", name);
  }
  saveSocialPlatform(social) {
    this.settings.social = social;
    let socialArray = social.map((e) => JSON.stringify(e));
    socialArray = socialArray.join();
    window.localStorage.setItem("platforms", socialArray);
  }
  getSettings() {
    this.settings = {
      name: "",
      social: [],
    };
    this.settings.name = window.localStorage.getItem("name") || "Default name";
    let social = window.localStorage.getItem("platforms");
    console.log(social);
    if (social != undefined) {
      this.settings.social = eval("[" + social + "]");
    }
    return this.settings;
  }

  getQrData() {
    let json = {};
    let settings = this.getSettings();
    if (settings != undefined) {
      json["name"] = settings.name;
      json["social"] = [];
      settings.social.forEach((element) => {
        json["social"].push({
          platform: element.platform,
          value: element.value,
        });
      });
    }
    return JSON.stringify(json);
  }
}
