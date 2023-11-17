import {Component, HostListener, ViewChild} from '@angular/core';
import {NgxChessBoardView} from 'ngx-chess-board';
import {Subject} from "rxjs";

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
})
export class ChessBoardComponent {
  @ViewChild('board', {static: false}) board!: NgxChessBoardView;

  private destroy = new Subject<void>();

  resetBoard() {
    this.board.reset();
  }

  undoMove() {
    this.board.undo()
  }

  reverseBoard() {
    this.board.reverse();
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
