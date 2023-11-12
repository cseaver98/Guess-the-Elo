import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PlayPageComponent } from './play-page/play-page.component';
import { FeatureRoutingModule } from './feature-routing.module';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { NgxChessBoardModule } from "ngx-chess-board";



@NgModule({
  declarations: [
    HomePageComponent,
    PlayPageComponent,
    ChessBoardComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    NgxChessBoardModule.forRoot()
  ]
})
export class FeatureModule { }
