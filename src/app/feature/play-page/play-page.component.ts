import {Component, ViewChild} from '@angular/core';
import {ChessBoardComponent} from "../chess-board/chess-board.component";
import {ChessWebApiService} from '../services/chess-web-api.service';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html'
})
export class PlayPageComponent {
  player: string = '';

  constructor(private chessService: ChessWebApiService) {
  }

  @ViewChild(ChessBoardComponent) chessboard!: ChessBoardComponent;

  resetBoard() {
    this.chessboard.resetBoard();
  }

  undo() {
    this.chessboard.undoMove();
  }

  reverse() {
    this.chessboard.reverseBoard();
  }

  getPlayer() {
    this.chessService.getPlayer('IT').then((data) => {
      this.player = data.data.players[500];
    });
  }
}
