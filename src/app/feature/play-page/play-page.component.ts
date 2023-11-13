import {Component, ViewChild} from '@angular/core';
import {ChessBoardComponent} from "../chess-board/chess-board.component";

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html'
})
export class PlayPageComponent {
  @ViewChild(ChessBoardComponent) chessboard!: ChessBoardComponent;

  resetBoard() {
    this.chessboard.resetBoard();
  }

  undo() {
    this.chessboard.undoMove();
  }
}
