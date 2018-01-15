import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  // form variables
  name: string;
  phone: string;
  email: string;
  address: string;
  department:string;

  constructor(
    private customerService: CustomerService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * Creates a new customer record
   * @param user THe details from the form
   */
  create(user) {

    this.customerService.saveCustomer(user).subscribe(data => {

      if (data['success']) {

        this.flashMessage.show(data['msg'], {cssClass: 'alert green', timeout: 3000});

        this.router.navigate(['/home']); // redirects to categories page
      } else {
        // if not saved
        this.flashMessage.show(data['msg'], {cssClass: 'alert red', timeout: 3000});
        this.router.navigate(['/customer/add']); // redirects to category form
      }

    });
  }

}
