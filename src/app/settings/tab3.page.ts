import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SettingsService } from "./settings.service";
import { Settings, Platform } from "./settings.model";
import { ContactsService } from "../contacts/contacts.service";
import { async } from "@angular/core/testing";
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
    private contactsService: ContactsService
  ) {
  }
  ngOnInit() {
    this.settings = {
      name: "",
      social: [],
    };
    this.settings = this.settingsService.getSettings();
  }
  saveSettings(name) {
    this.settings.name = name.value;
    this.settingsService.saveName(this.settings.name);
    this.settingsService.saveSocialPlatform(this.settings.social);
  }
  addSocialPlatform(socialKey, socialValue) {
    let required = false;
    if (socialKey.value == "") {
      socialKey.color = "danger";
      required = true;
    }
    else {
      socialKey.color = "";
    }
    if (socialValue.value == "") {
      socialValue.color = "danger";
      required = true;
    }
    else {
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
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
