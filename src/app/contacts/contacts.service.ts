import { Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import { Platform } from "../settings/settings.model";
@Injectable({
  providedIn: "root",
})
export class ContactsService {
  // private contacts = [
  //   {
  //     id: "",
  //     name: "",
  //     social: [{ platform: "", value: "" }],
  //   },
  // ];
  private contacts: Contact[];
  constructor() {}

  getContacts() {
    let contactsStored = window.localStorage.getItem("contacts");
    if (contactsStored != undefined) {
      this.contacts = eval("[" + contactsStored + "]");
      return [...this.contacts];
    }
    return []
  }

  getContact(contactId: string) {
    return {
      ...this.contacts.find((contact) => {
        return contact.id === contactId;
      }),
    };
  }

  addContact(name: string, social: Platform[]) {
    if (this.contacts === undefined) {
      this.contacts = []
    }
    let id = this.contacts.length + 1 + ""
    this.contacts.push({
      name: name,
      social: social,
      id: id,
    });
    this.saveToLocalStorage(this.contacts)
    return id
  }

  deleteContact(contactId: string) {
    this.contacts = this.contacts.filter((contact) => {
      return contact.id !== contactId;
    });
    this.saveToLocalStorage(this.contacts)
  }

  saveToLocalStorage(contacts){
    let contactsArray = this.contacts.map((e) => JSON.stringify(e));
    console.log(contactsArray)
    let contactsToStorage = contactsArray.join();
    console.log(contactsToStorage)
    window.localStorage.setItem("contacts", contactsToStorage);
  }
}
