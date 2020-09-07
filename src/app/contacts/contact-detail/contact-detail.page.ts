import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactsService } from "../contacts.service";
import { AlertController } from "@ionic/angular";
import { Contact } from "../contact.model";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.page.html",
  styleUrls: ["./contact-detail.page.scss"],
})
export class ContactDetailPage implements OnInit {
  contact: Contact;

  constructor(
    private activateRoute: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((param) => {
      // redirect
      const contactId = param.get("contactId");
      this.contact = this.contactsService.getContact(contactId);
    });
  }

  async deleteContact() {
    const alertWizard = await this.alertCtrl.create({
      header: "Are you sure, you want to delete it?",
      message: "The changes are not reversed",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Delete",
          handler: () => {
            this.contactsService.deleteContact(this.contact.id);
            this.router.navigate(["/tabs/contacts"]);
          },
        },
      ],
    });
    alertWizard.present()
  }
}
