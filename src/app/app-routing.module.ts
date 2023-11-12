import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./feature/home-page/home-page.component";
import {PageNotFoundComponent} from "./core/page-not-found/page-not-found.component";
import {featureRoutes} from './feature/feature-routing.module';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  ...featureRoutes,
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
