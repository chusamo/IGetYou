import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { SettingsService } from "./settings.service";
import { Settings, Platform } from "./settings.model";
import { ContactsService } from "../contacts/contacts.service";
import { HttpClient, HttpHeaders, JsonpClientBackend } from "@angular/common/http";
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  private settings: Settings;
  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private contactsService: ContactsService,
    public http: HttpClient,
    public alertController: AlertController
  ) {}
  ngOnInit() {
    this.settings = {
      name: "",
      token: "",
      social: [],
    };
    this.settings = this.settingsService.getSettings();
    if (this.settings.token == undefined || this.settings.token == "") {
      this.settings.token = this.settingsService.generateToken();
    }
  }
  async presentAlert(title, msg) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  saveSettings(name) {
    if (name.value == ""){
      this.presentAlert('Alert', 'You must write at least a name.')
      return;
    }
    if (name.value != undefined){
      this.settings.name = name.value;
    }
    this.settingsService.saveName(this.settings.name);
    this.settingsService.saveToken(this.settings.token);
    this.settingsService.saveSocialPlatform(this.settings.social);
    let json = this.settingsService.getJSON();
    let request = this.sendPostRequest(json, "save")
    if(request == true){
      this.presentAlert("Information", "Your data has been saved!")
    }
    else{
      this.presentAlert("Information", "There is some connection problems. "+
      "You QR will be generated offline, only people with this app can scan it")
      // TODO Create QR DATA WITH JSON USE PACK JSON LIBRARY FOR REDUCE SPACE
    }
  }

  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Delete!',
      message: 'Are you sure you want to <strong>delete</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Delete',
          cssClass: 'primary',
          handler: () => {
            this.deleteSettings()
          }
        }
      ]
    });

    await alert.present();
  }
  deleteSettings(){
    let oldName = this.settings.name
    this.settings.name = ""
    this.settings.social = []
    this.settingsService.deleteSettings()
    this.sendPostRequest(JSON.stringify(
      {delete: true, token: this.settings.token, name: oldName}), "delete")
    // Comment alert because there are too many clics
    // this.presentAlert('Information', "You data has been deleted sucessfully")
  }

  sendPostRequest(json, action="") {
    // let headers = new Headers().set("'Content-Type", "application/json")
    console.log("HOlA")
    this.http
      .post("http://igetyou.website/connect.php", json) 
      .subscribe(
        (data) => {
          if ( data != null && data['action'] == 'update_token'){
            this.settings.token = this.settingsService.generateToken();
            this.settingsService.saveToken(this.settings.token);
            console.log("ACTUALIZAMOS TOKEN")
            json = JSON.parse(json)
            json['token'] = this.settings.token
            this.sendPostRequest(JSON.stringify(json))
          }
          return true;
        },
        (error) => {
          console.log(error)
          return false;
        }
      );
    return true;
  }
  addSocialPlatform(socialKey, socialValue) {
    let required = false;
    if (socialKey.value == "") {
      socialKey.color = "danger";
      required = true;
    } else {
      socialKey.color = "";
    }
    if (socialValue.value == "") {
      socialValue.color = "danger";
      required = true;
    } else {
      socialValue.color = "";
    }
    if (required) {
      return;
    }
    if (
      this.settings.social.find(
        (social) => social.platform === socialKey.value
      ) === undefined
    ) {
      let socialPlatform = socialKey.value;
      let socialPlatformValue = socialValue.value;
      this.settings.social.push({
        platform: socialPlatform,
        value: socialPlatformValue,
      });
      socialKey.value = "";
      socialValue.value = "";
    }
  }

  deleteSocialPlatoform(platorm: string) {
    this.settings.social = this.settings.social.filter((social) => {
      return social.platform !== platorm;
    });
    this.settingsService.saveSocialPlatform(this.settings.social);
  }
}
