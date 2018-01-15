import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customers: any;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  del(id) {
    this.customerService.deleteCustomer(id).subscribe(data => {
      if (data['success']) {
        // show success alert
        this.flashMessage.show(data['msg'], { cssClass: 'alert green', timeout: 3000 });

        this.router.navigateByUrl('/home');

        this.customers = data['customers'];
      } else {
        this.flashMessage.show('An error occurred during the process, please try again.',
          { cssClass: 'alert red', timeout: 3000 });
        this.router.navigate(['/home']); // redirect to category page
      }
    });
  }



}
