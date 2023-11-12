import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PlayPageComponent } from './play-page/play-page.component';
import { FeatureRoutingModule } from './feature-routing.module';



@NgModule({
  declarations: [
    HomePageComponent,
    PlayPageComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule
  ]
})
export class FeatureModule { }
