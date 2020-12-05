import { Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import { Platform } from "../settings/settings.model";
@Injectable({
  providedIn: "root",
})
export class ContactsService {
  private contacts = [
    {
      id: "1",
      name: "Contacto Prueba",
      phone: "73728392",
      email: "example@test.com",
      description: "Short Descriptionn kjashdkjashdi qoiweu aksjhd qiwuhe asdha po qweiou askdh qoihqwe kashd oiqwhe  asjkdhasd",
      social: [{ platform: "Blog", value: "https://igetyou.app"}],
    },
  ];
  // private contacts: Contact[];
  constructor() {}

  getContacts() {
    return [...this.contacts];
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

  addContact(data) {
    if (this.contacts === undefined) {
      this.contacts = []
    }
    let id = this.contacts.length + 1 + ""
    this.contacts.push({
      name: data["name"],
      social: data["social"],
      id: id,
      email: data["email"],
      phone: data["phone"],
      description: data["description"],
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
