import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AddReviewComponent } from './add-review/add-review.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'dodajRecenziju', component: AddReviewComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }