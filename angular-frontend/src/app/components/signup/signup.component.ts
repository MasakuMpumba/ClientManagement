import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string;
  password: string;
  phone: string;
  email: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  signUp(data) {
    this.auth.registerUser(data).subscribe(data => {
      if (data['success']) {
        this.flashMessages.show('Your are now registered and can sign in!',
          { cssClass: 'alert green', timeout: 3000 });

          // redirect to the login page
          this.router.navigate(['/home']);
      } else {
        // if not registered
        this.flashMessages.show('Oops! Something went worng, try again',
          { cssClass: 'alert red', timeout: 3000 });

          // direct back to register page
          this.router.navigate(['/signUp']);
      }
    });
  }

}
