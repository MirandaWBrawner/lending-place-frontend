import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LendableComponent } from './components/lendable/lendable.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { DonationComponent } from './components/donation/donation.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
