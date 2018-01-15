import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  /**
     * Logs the user out of the system
     */
  onLogout() {
    this.auth.logout();
    // flash logout msg
    this.flashMessages.show('You have succefully logged out, later!',
      { cssClass: 'alert-success', timeout: 3000 });
    // redirects to home
    this.router.navigate(['/']);
    return false;
  }

}
