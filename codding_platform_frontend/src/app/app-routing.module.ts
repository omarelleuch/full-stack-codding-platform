import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemDetailComponent } from './problem-detail/problem-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'SignUp', component: SignUpComponent},
  {path: 'SignIn', component: SignInComponent},
  {path: 'problems', component: ProblemsComponent},
  {path: 'problem/:id', component: ProblemDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
