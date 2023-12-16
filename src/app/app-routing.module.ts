import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";
import {HomePageComponent} from "./feature/components/home-page/home-page.component";

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {
    path: 'play-page',
    loadChildren: () => import('./feature/feature.module').then(_x => _x.FeatureModule)
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
