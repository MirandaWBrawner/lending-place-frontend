import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LendableComponent } from './components/lendable/lendable.component';
import { DonationComponent } from './components/donation/donation.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageListComponent } from './components/language-list/language-list.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeePortalComponent } from './components/employee-portal/employee-portal.component';
import { FailedLoginComponent } from './components/failed-login/failed-login.component';
import { RecommendationThankYouComponent } from './components/recommendation-thank-you/recommendation-thank-you.component';
import { LoanOrderConfirmationComponent } from './components/loan-order-confirmation/loan-order-confirmation.component';

const routes: Routes = [
  {path: 'browse', component: LendableComponent},
  {path: 'recommend', component: RecommendationComponent},
  {path: 'donate', component: DonationComponent},
  {path: 'browse/:language', component: LendableComponent},
  {path: 'recommend/:language', component: RecommendationComponent},
  {path: 'donate/:language', component: DonationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/:language', component: LoginComponent},
  {path: 'employeePortal', component: EmployeePortalComponent},
  {path: 'employeePortal/:language', component: EmployeePortalComponent},
  {path: 'failedLogin', component: FailedLoginComponent},
  {path: 'failedLogin/:language', component: FailedLoginComponent},
  {path: 'recommendThankYou', component: RecommendationThankYouComponent},
  {path: 'recommendThankYou/:language', component: RecommendationThankYouComponent},
  {path: 'confirm', component: LoanOrderConfirmationComponent},
  {path: 'confirm/:language', component: LoanOrderConfirmationComponent},
  {path: 'en', redirectTo: '/browse/en', pathMatch: 'full'},
  {path: 'sw', redirectTo: '/browse/sw', pathMatch: 'full'},
  {path: 'hi', redirectTo: '/browse/hi', pathMatch: 'full'},
  {path: 'zh', redirectTo: '/browse/zh', pathMatch: 'full'},
  {path: 'ar', redirectTo: '/browse/ar', pathMatch: 'full'},
  {path: 'es', redirectTo: '/browse/es', pathMatch: 'full'},
  {path: 'fr', redirectTo: '/browse/fr', pathMatch: 'full'},
  {path: '', redirectTo: '/browse/en', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LendableComponent,
    DonationComponent,
    RecommendationComponent,
    LanguageListComponent,
    LoginComponent,
    EmployeePortalComponent,
    FailedLoginComponent,
    RecommendationThankYouComponent,
    LoanOrderConfirmationComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
