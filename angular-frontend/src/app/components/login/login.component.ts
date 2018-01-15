import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form variables
  phone: string;
  password: string;
  token: string;
  user: any;

  constructor(
    private auth: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(credentials) {
    this.auth.authenticateUser(credentials).subscribe(data => {
      if (data['success'] === true) {
        // stting variables
        this.token = data['token'];
        this.user = data['user'];

        // storing data in localstorage
        this.auth.storeUserData(this.token, this.user);
        // welcome message
        this.flashMessages.show('Welcome, you are now logged in as - ' + this.user['username'] ,
          {cssClass: 'alert green lighten-1', timeout: 3000});

          console.log(this.user['username']);
          // redirect to page
        this.router.navigate(['/home']);
      } else {
        // error msg
        this.flashMessages.show(data['msg'], {cssClass: 'alert red', timeout: 3000});
      }
    });
  }

}
