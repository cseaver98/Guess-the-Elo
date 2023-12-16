import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayPageComponent } from './components/play-page/play-page.component';

export const featureRoutes: Routes = [
  { path: '', component: PlayPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(featureRoutes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
