import {Component, ViewChild} from '@angular/core';
import {NgxChessBoardView} from 'ngx-chess-board';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html'
})
export class ChessBoardComponent {
  @ViewChild('board', {static: false}) board!: NgxChessBoardView;

  resetBoard() {
    this.board.reset();
  }

  undoMove() {
    this.board.undo()
  }
}
