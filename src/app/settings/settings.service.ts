import { Injectable } from "@angular/core";
import { Settings } from "./settings.model";
import { AlertController } from '@ionic/angular';
import {
  HttpClient,
  HttpHeaders,
  JsonpClientBackend,
} from "@angular/common/http";
import { tokenName } from '@angular/compiler';
@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private settings: Settings;
  private website = "http://www.igetyou.website/contact";
  private saved = false;
  constructor(public http: HttpClient,   public alertController: AlertController) {}

  markAsSaved(saved) {
    this.saved = saved;
    window.localStorage.setItem("saved", saved);
  }
  IsSaved() {
    window.localStorage.getItem("saved") || false;
  }
  canShare(){
    return this.getName() != "";
  }
  saveName(name) {
    this.settings.name = name;
    window.localStorage.setItem("name", name);
  }
  getName(){
    return window.localStorage.getItem("name") || "";
  }
  saveToken(token) {
    console.log("guardamos token");
    console.log(token);
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

  deleteSettings() {
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
    console.log("EJECUTAMOS GET SETTINGS");
    let settings = this.getSettings();
    console.log("GET JSON");
    console.log(settings);
    if (settings != undefined) {
      if (settings.name == "") {
        return void {};
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
  getToken() {
    return window.localStorage.getItem("token");
  }
  getQrData(type="token") {
    let qrData = "";
    if (type == "token"){
      qrData = this.website + "?token=" + this.getToken();
    }
    else if (type == "json"){
      let json = this.getJSON();
      if (json){
        qrData = json;
      }
    }
    console.log(qrData);
    return qrData;
  }

  sendSaveRequest(json, token, showAlert=true, generateQR=false) {
    // let headers = new Headers().set("'Content-Type", "application/json")
    console.log("HOlA");
    this.http.post("http://igetyou.website/save.php", json).subscribe(
      (data) => {
        if (data != null && data["action"] == "update_token") {
          this.settings.token = this.generateToken();
          this.saveToken(token);
          console.log("ACTUALIZAMOS TOKEN");
          json = JSON.parse(json);
          json["token"] = this.settings.token;
          this.sendSaveRequest(JSON.stringify(json), token);
          return ;
        }
        if (showAlert){
          this.presentAlert("Information", "Your data has been saved!")
        }
      },
      (error) => {
        console.log(error)
        if (showAlert){
          this.presentAlert("Information", "There is some connection problems. "+
          "You QR will be generated offline, only people with this app can scan it")
        }
      }
    );
  }
  sendDeleteRequest(json) {
    this.http.post("http://igetyou.website/delete.php", json).subscribe();
  }


  async presentAlert(title, msg) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
