import { CustomerService } from './services/customer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

// route links
const appRoutes: Routes = [

  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signUp', component: SignupComponent },
  { path: 'edit/:id', component: EditCustomerComponent, canActivate: [AuthGuard] },
  { path: 'customer/add', component: CustomerFormComponent, canActivate: [AuthGuard] }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    EditCustomerComponent,
    NavbarComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
  ],
  providers: [AuthService, AuthGuard, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
