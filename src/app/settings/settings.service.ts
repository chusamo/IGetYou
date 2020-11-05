import { Injectable } from "@angular/core";
import { Settings } from "./settings.model";
@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private settings: Settings;
  private website = "http://www.igetyou.website/contact";
  constructor() {}

  saveName(name) {
    this.settings.name = name;
    window.localStorage.setItem("name", name);
  }
  saveToken(token) {
    console.log("guardamos token")
    console.log(token)
    window.localStorage.setItem("token", token);
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
      token: "",
      social: [],
    };
    this.settings.name = window.localStorage.getItem("name") || "";
    let social = window.localStorage.getItem("platforms");
    if (social != undefined) {
      this.settings.social = eval("[" + social + "]");
    }
    this.settings.token = window.localStorage.getItem("token");
    return this.settings;
  }

  deleteSettings(){
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("platforms");
  }
  generateToken() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  getJSON() {
    let json = {};
    console.log("EJECUTAMOS GET SETTINGS")
    let settings = this.getSettings();
    console.log("GET JSON")
    console.log(settings)
    if (settings != undefined) {
      if (settings.name == "") {
        return json;
      }
      json["name"] = settings.name;
      json["token"] = settings.token;
      json["social"] = [];
      settings.social.forEach((element) => {
        json["social"].push(
          JSON.stringify({
            platform: element.platform,
            value: element.value,
          })
        );
      });
      json["social"] = "[" + json["social"] + "]";
    }
    return JSON.stringify(json);
  }
  getToken(){
    return window.localStorage.getItem("token");
  }
  getQrData() {
    let token = this.getToken();
    console.log(token)
    let qrData = "";
    if (token != null && token != ""){
      qrData = this.website + "?token=" + this.getToken();
    }
    return qrData
  }
}
