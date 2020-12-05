import { Component } from "@angular/core";
import { SettingsService } from "../settings/settings.service";
import { ContactsService } from "../contacts/contacts.service";
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  JsonpClientBackend,
} from "@angular/common/http";
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  private dataScanned: any;
  private qrData: any;
  private shareQR: any;
  constructor(
    public http: HttpClient,
    private barcodeScanner: BarcodeScanner,
    private settingsService: SettingsService,
    private contactsService: ContactsService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.shareQR = false
    this.qrData = ''

  }
  ionViewWillEnter() {
    this.shareQR = false
    this.qrData = ''
    // this.qrData = this.settingsService.getQrData();
  }
  share(){
    this.sendCheckRequest();
  }
  scan_test(){
    this.processScan(this.settingsService.getQrData())}
  scan() {
    this.dataScanned = null;
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.dataScanned = barcodeData.text;
        this.processScan(barcodeData.text);
      })
      .catch((err) => {});
  }
  scan_web() {
    window.open(this.settingsService.getQrData(), '_blank');
  }
  _processScan(data){
    if (!this.checkValid(data)) {
      // redirigir a pestanya de error
      this.router.navigate(["/tabs/scanner/invalid"]);
    } else {
      // agregar contacto
      let idContact = this.contactsService.addContact(data);
      let link = "/tabs/contacts/" + idContact;
      this.router.navigate([link]);
    }
  }
  processScan(data) {
    let json = {};
    // Check if is a url
    if (data.includes("token=")) {
      let token = data.split("token=")[1];
      let url = this.settingsService.website + "/get.php?token=" + token;
      this.http.get(url).subscribe(
        (response) => {
          response['social'] = JSON.parse(response['social'])
          this._processScan(response)
        },
        (error) => {
          console.log("ENTRA EN ERROR AL OBTENER DATOS")
          console.log(error)
          this.router.navigate(["/tabs/scanner/invalid"]);
        }
      )
    }
    else{
      try {
        json = JSON.parse(data);
        this._processScan(data)
      } catch {
        this.router.navigate(["/tabs/scanner/invalid"]);
      }
    }
   
  }

  checkValid(json) {
    return "name" in json && "social" in json;
  }


ForceSaveRequest(json){
// let headers = new Headers().set("'Content-Type", "application/json")
  this.http.post("http://icatchyou.info/save.php", json).subscribe(
    (data) => {
      if (data != null && data["action"] == "update_token") {
        let token = this.settingsService.generateToken();
        this.settingsService.saveToken(token);
        this.ForceSaveRequest(JSON.stringify(json));
        return ;
      }
      console.log("OBTENEMOS QR DESDE EL TOKEN UNA VEZ GUARDADO")
      this.qrData = this.settingsService.getQrData("token")
      this.shareQR = true;
    },
    (error) => {
      console.log("OBTENEMOS QR  DESDE JSON")
      this.settingsService.presentAlert(
        "Information", "There is a problem with the connection. You can share this code <strong>offline</strong>" +
        " with those <strong>who have downloaded</strong> this app")
      this.qrData = this.settingsService.getQrData("json")
      this.shareQR = true;
      
    }
);
  }
  sendCheckRequest() {
    let tokenValue = this.settingsService.getToken();
    console.log(tokenValue)
    if (tokenValue == null){
      this.qrData = ''
      this.shareQR = true
      return
    }
    let nameValue = this.settingsService.getName();
    this.http.post("http://icatchyou.info/check.php", JSON.stringify({token: tokenValue, name: nameValue})).subscribe(
      data => {
        console.log("OBTENDO EL QR DESDE EL TOKEN PORQUE YA EXISTE")
        this.qrData = this.settingsService.getQrData("token")
        this.shareQR = true;
      },
      error => {
        if (this.settingsService.canShare()){
          let token = this.settingsService.getToken()
          let json = this.settingsService.getJSON()
          this.ForceSaveRequest(json);
        }
        else{
          this.qrData = ''
          this.shareQR = true
        }

      }
    );
  }
  check(){
    this.sendCheckRequest()
  }
}
