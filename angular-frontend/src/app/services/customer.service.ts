import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService {

  contentHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Gets user's cv
   */
  getCustomers() {
    return this.http.get('http://localhost:3000/customers/');
  }

  getCustomer(id) {
    return this.http.get('http://localhost:3000/customers/' + id);
  }

  /**
   * Sends the cv-form data to the backend for db insert
   * @param cv 
   */
  saveCustomer(data) {

    return this.http.post('http://localhost:3000/customers/create', data, {headers: this.contentHeader});
  }

  
  updateCustomer(customer_id, cv) {

    return this.http.put('http://localhost:3000/customers/update/' + customer_id, cv, {headers: this.contentHeader});
  }

  deleteCustomer(customer_id) {
    return this.http.delete('http://localhost:3000/customers/delete/' + customer_id);
  }

}
