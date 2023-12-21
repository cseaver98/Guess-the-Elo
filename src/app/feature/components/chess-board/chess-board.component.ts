import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Chess } from 'chess.js';
import { Game } from '../../models/game';
import { EvaluationBarComponent } from '../evaluation-bar/evaluation-bar.component';

declare var ChessBoard: any;

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [EvaluationBarComponent],
})
export class ChessBoardComponent implements OnInit {
  private destroy = new Subject<void>();
  board: any;
  game = new Chess();
  moveList: string[] = [];
  i: number = 0;
  @Input() gameData?: Game;

  ngOnInit() {
    this.board = ChessBoard('board', {
      position: 'start',
      draggable: true,
    });
  }

  move(): string {
    if (this.i < this.moveList.length) {
      let moveObject = this.game.move(this.moveList[this.i]);
      this.board.position(moveObject.after);
      this.i++;
      return moveObject.after;
    }
    return "";
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
      this.board.position(moveObject.before, true);
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
    whitePawnUrl: 'assets/white-pawn.svg',
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

    return (
      Math.max(
        minSize,
        Math.min(maxSize, Math.min(windowWidth, windowHeight) - 50),
      ) - 25
    );
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
