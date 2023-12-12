import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page/home-page.component';
import {PlayPageComponent} from './play-page/play-page.component';
import {FeatureRoutingModule} from './feature-routing.module';
import {ChessBoardComponent} from './chess-board/chess-board.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    HomePageComponent,
    PlayPageComponent,
    ChessBoardComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatButtonModule
  ]
})
export class FeatureModule {
}
