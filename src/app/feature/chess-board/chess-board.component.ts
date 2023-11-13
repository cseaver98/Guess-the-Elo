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

  pieceIcons = {
    blackBishopUrl: 'assets/black-bishop.svg',
    blackKingUrl: 'assets/black-king.svg',
    blackKnightUrl: 'assets/black-knight.svg',
    blackRookUrl: 'assets/black-rook.svg',
    blackQueenUrl: 'assets/black-queen.svg',
    blackPawnUrl: 'assets/black-pawn.svg',
    whiteBishopUrl: 'assets/white-bishop.svg',
    whiteKingUrl: 'assets/white-king.svg',
    whiteKnightUrl: 'assets/white-knight.svg',
    whiteRookUrl: 'assets/white-rook.svg',
    whiteQueenUrl: 'assets/white-queen.svg',
    whitePawnUrl: 'assets/white-pawn.svg'
  };
}
