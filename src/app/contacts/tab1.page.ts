import { Component } from "@angular/core";
import { ContactsService } from "./contacts.service";
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  contacts = [];
  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

  ionViewWillEnter(){
    this.contacts = this.contactsService.getContacts();
    console.log(this.contacts);
  }

  deleteContact() {
    console.log("Eliminado");
  }
}
