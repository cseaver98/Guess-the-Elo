import {Component, ViewChild} from '@angular/core';
import {NgxChessBoardView} from 'ngx-chess-board';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {screenWidths} from "../../shared/constants/screen-widths";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html'
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

  componentSize: number = 400;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.setComponentSize();
    this.breakpointObserver.observe([
      screenWidths.mobileS,
      screenWidths.mobileM,
      screenWidths.mobileL,
      screenWidths.laptopXS,
      screenWidths.laptopS,
      screenWidths.laptopM,
      screenWidths.laptopL,
      screenWidths.laptopXL
    ])
      .pipe(takeUntil(this.destroy))
      .subscribe(_ => {
        this.setComponentSize();
      });
  }

  private setComponentSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 320) {
      this.componentSize = 300;
    }
    if (screenWidth <= 375 && screenWidth >= 321) {
      this.componentSize = 350;
    }
    if (screenWidth <= 425) {
      this.componentSize = 600;
    } else if (screenWidth <= 600) {
      this.componentSize = 415;
    } else if (screenWidth < 960) {
      this.componentSize = 675;
    } else if (screenWidth < 1280) {
      this.componentSize = 1000;
    } else if (screenWidth < 1920) {
      this.componentSize = 1250;
    } else {
      this.componentSize = 1500;
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
