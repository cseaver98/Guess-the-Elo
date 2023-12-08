import {Component, HostListener} from '@angular/core';
import {Subject} from "rxjs";
import {Chess} from 'chess.js';

declare var ChessBoard: any;

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
})
export class ChessBoardComponent {
  private destroy = new Subject<void>();
  board: any;
  game = new Chess();
  moveList: string[] = [];
  i: number = 0;

  ngOnInit() {
    this.board = ChessBoard('board', {
      position: 'start',
      draggable: true
    });
  }

  move() {
    let moveObject = this.game.move(this.moveList[this.i]);
    this.board.move(moveObject.from + '-' + moveObject.to);
    this.i++;
  }

  reset() {
    this.i = 0;
    this.game.reset();
    this.board.start();
  }

  flipBoard() {
    this.board.flip();
  }

  undo() {
    let moveObject = this.game.undo();
    if (moveObject) {
      this.board.move(moveObject.to + '-' + moveObject.from);
      this.i--;
    }
  }

  setMoveList(moveList: string[]) {
    this.moveList = moveList;
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

  componentWidth: number = this.calculateWidth();

  @HostListener('window:resize')
  onResize() {
    this.componentWidth = this.calculateWidth();
  }

  private calculateWidth(): number {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minSize = 300;
    const maxSize = 1100;

    return Math.max(minSize, Math.min(maxSize, Math.min(windowWidth, windowHeight) - 50)) - 25;
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
