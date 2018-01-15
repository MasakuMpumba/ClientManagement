import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { LoginComponent } from './../components/login/login.component';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {

    }

    canActivate() {
        if (this.authService.loggedIn()) {
           return true;
        } else {
            this.router.navigateByUrl('/');  // shows the loggin modal
            return false;
        }
    }
}
