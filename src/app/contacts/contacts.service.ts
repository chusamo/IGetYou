import { Injectable } from "@angular/core";
import { Contact } from './contact.model'
@Injectable({
  providedIn: "root",
})
export class ContactsService {
  private contacts = [
    {
      id: "1",
      name: "Jose Javier",
      social: [
        { platform: "Facebook", value: "https://facebook.com/JJ" },
        { platform: "Phone", value: "+3463618723" },
      ],
    },
    {
      id: "2",
      name: "Antonia",
      social: [
        { platform: "Facebook", value: "https://facebook.com/Antonia" },
        { platform: "Phone", value: "+3463618723" },
        { platform: "Instagram", value: "https:/instragra.com/antonia" },
      ],
    },
  ];
  constructor() {}

  getContacts() {
    return [...this.contacts];
  }

  getContact(contactId: string) {
    return {
      ...this.contacts.find((contact) => {
        return contact.id === contactId;
      }),
    };
  }

  // addContact(name: string, facebook: string) {
  //   this.contacts.push({
  //     name: name,
  //     facebook: facebook,
  //     id: this.contacts.length + 1 + "",
  //   });
  //   console.log(this.contacts);
  // }

  deleteContact(contactId: string) {
    this.contacts = this.contacts.filter((contact) => {
      return contact.id !== contactId;
    });
  }
}
