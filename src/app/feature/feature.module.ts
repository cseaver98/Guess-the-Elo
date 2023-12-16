import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayPageComponent} from "./components/play-page/play-page.component";
import {FeatureRoutingModule} from './feature-routing.module';
import {ChessBoardComponent} from "./components/chess-board/chess-board.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {EvaluationBarComponent } from '../core/evaluation-bar/evaluation-bar.component';

@NgModule({
  declarations: [
    PlayPageComponent,
    ChessBoardComponent,
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatButtonModule,
    EvaluationBarComponent,
  ]
})
export class FeatureModule {
}
