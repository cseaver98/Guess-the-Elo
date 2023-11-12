import { Component } from '@angular/core';
import {NgxChessBoardService} from 'ngx-chess-board';
@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html'
})
export class ChessBoardComponent {
  constructor(private _: NgxChessBoardService) { }
}
