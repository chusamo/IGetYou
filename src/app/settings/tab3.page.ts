import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { SettingsService } from "./settings.service";
import { Settings, Platform } from "./settings.model";
import { ContactsService } from "../contacts/contacts.service";

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


  saveSettings(name) {
    if (name.value == ""){
      this.settingsService.presentAlert('Alert', 'You must write at least a name.')
      return;
    }
    if (name.value != undefined){
      this.settings.name = name.value;
    }
    this.settingsService.saveName(this.settings.name);
    this.settingsService.saveToken(this.settings.token);
    this.settingsService.saveSocialPlatform(this.settings.social);
    let json = this.settingsService.getJSON();
    let request = this.settingsService.sendSaveRequest(json, this.settings.token)
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
    this.settingsService.sendDeleteRequest(JSON.stringify(
      {token: this.settings.token, name: oldName}))
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
