import { Component } from "@angular/core";
import { ContactsService } from "./contacts.service";
import { Contact } from './contact.model'

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  contacts: Contact[];
  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

  ionViewWillEnter(){
    this.contacts = this.contactsService.getContacts();
  }

}
