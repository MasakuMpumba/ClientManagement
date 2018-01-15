import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  department:string;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get the id from the url
    this.id = this.route.snapshot.params['id'];
    // get the category from db
    this.customerService.getCustomer(this.id).subscribe(data => {
      this.name = data['name'];
      this.phone = data['phone'];
      this.email = data['email'];
      this.address = data['address'];
      this.department= data['department']
    });
  }

  update(customer) {
    this.customerService.updateCustomer(this.id, customer).subscribe(data => {

      if (data['success']) {
        this.flashMessage.show(data['msg'], {cssClass: 'alert green', timeout: 3000});

        this.router.navigateByUrl('/home');
      } else {
        // error message
        this.flashMessage.show(data['msg'], {cssClass: 'alert red', timeout: 3000});
        return;
      }

    });
  }

}
