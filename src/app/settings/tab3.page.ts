import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SettingsService } from "./settings.service";
import { Settings, Platform } from "./settings.model";
import { ContactsService } from "../contacts/contacts.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    public http: HttpClient
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
    this.settings.name = name.value;
    this.settingsService.saveName(this.settings.name);
    this.settingsService.saveToken(this.settings.token);
    this.settingsService.saveSocialPlatform(this.settings.social);
    let json = this.settingsService.getJSON();
    console.log(json)
    this.sendPostRequest(json);
  }
  sendPostRequest(json) {
    // let headers = new Headers().set("'Content-Type", "application/json")
    this.http
      .post("http://igetyou.website/connect.php", json)
      .subscribe(
        (data) => {
          console.log("ENTRA DENTRO")
          console.log(data)
        },
        (error) => {
          console.log("DA ERROR 2");
          console.log(error);
        }
      );
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
