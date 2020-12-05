import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { SettingsService } from "./settings.service";
import { Settings, Platform } from "./settings.model";
import { ContactsService } from "../contacts/contacts.service";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
  };

  cropOptions: CropOptions = {
    quality: 50
  }
  private settings: Settings;
  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private contactsService: ContactsService,
    public alertController: AlertController,
    private crop: Crop,
    private imagePicker: ImagePicker,
    private file: File
  ) {}
  ngOnInit() {
    this.settings = {
      name: "",
      token: "",
      social: [],
      phone: "",
      email: "",
      description: "",
    };
    this.settings = this.settingsService.getSettings();
    if (this.settings.token == undefined || this.settings.token == "") {
      this.settings.token = this.settingsService.generateToken();
      this.settingsService.saveToken(this.settings.token);
    }
  }

  pickImage() {
    this.imagePicker.getPictures(this.imagePickerOptions).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.cropImage(results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }

  cropImage(imgPath) {
    this.crop.crop(imgPath, this.cropOptions)
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          // alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    let fileName = copyPath.split('/').pop();
    let filePath = copyPath.replace(fileName, '');;
    fileName = fileName.split('?')[0];   // --> This Line is added to make it work in case of Image...
    alert(fileName)
    alert(filePath)
    this.file.readAsDataURL(filePath, fileName).then((data) => {
      alert("ENTRA DENTRO DEL READ DATA")
      this.croppedImagepath = data;
      this.isLoading = false
    }).catch(
      err => { 
        alert("ERROR")
      });
  }


  saveSettings(name, phone, email, description) {
    if (name.value == ""){
      this.settingsService.presentAlert('Alert', 'You must write at least a name.')
      return;
    }
    if (name.value != undefined){
      this.settings.name = name.value;
    }

    this.settingsService.saveName(this.settings.name);
    this.settings.phone = phone.value;
    this.settingsService.savePhone(phone.value);
    this.settings.email = email.value;
    this.settingsService.saveEmail(email.value);
    this.settings.description = description.value;
    this.settingsService.saveDescription(description.value);
    this.settingsService.saveSocialPlatform(this.settings.social);
    let json = this.settingsService.getJSON();
    let request = this.settingsService.sendSaveRequest(json, this.settingsService.getToken())
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
    this.settings.phone = ""
    this.settings.email = ""
    this.settings.description = ""
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
