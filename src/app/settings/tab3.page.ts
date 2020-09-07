import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SettingsService } from './settings.service'
import { Settings } from './settings.model'
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  private settings: Settings;

  constructor(private settingsService: SettingsService, private router: Router) {}
  ngOnInit(){
    this.settings = this.settingsService.getSettings()
  }
  saveSettings(name) {
    this.settingsService.saveName(name.value)
    this.settings.name = name.value
  }
  addSocialPlatform(socialKey, socialValue) {
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
      this.settingsService.saveSocialPlatform(this.settings.social);
    }
  }

  deleteSocialPlatoform(platorm: string) {
    this.settings.social = this.settings.social.filter((social) => {
      return social.platform !== platorm;
    });
    this.settingsService.saveSocialPlatform(this.settings.social);
  }

}
