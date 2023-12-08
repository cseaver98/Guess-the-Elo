import {Component, HostListener} from '@angular/core';
import {Subject} from "rxjs";

declare var ChessBoard: any;

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
})
export class ChessBoardComponent {
  private destroy = new Subject<void>();
  board: any;

  ngOnInit() {
    this.board = ChessBoard('board', {
      position: 'start',
      draggable: true
    });
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

  componentWidth: number = 400;

  @HostListener('window:resize')
  onResize() {
    this.componentWidth = 400;
  }

  get resized() {
    return `w-[${this.componentWidth}px]`;
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
