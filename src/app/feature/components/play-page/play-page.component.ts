import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChessBoardComponent } from '../chess-board/chess-board.component';
import { ChessWebApiService } from '../../../core/services/chess-web-api.service';
import { COUNTRY_CODES } from '../../../core/constants/country-codes';
import { randomNumber } from '../../../core/util/random-number';
import { parse } from '@mliebelt/pgn-parser';
import { Game } from '../../models/game';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { StockfishEvaluationApiService } from '../../../core/services/stockfish-evaluation-api.service';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ChessBoardComponent,
    MatSliderModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
  ],
})
export class PlayPageComponent implements OnInit {
  private player: string = '';
  private playerGamesUrl: string = '';
  protected gameData?: Game;
  protected eloGuess: FormControl<number | null> = new FormControl(100);
  private currentGameScore: number = 0;
  private overallScore: number = 0;
  private averageElo: number | null = null;
  protected disableBar: boolean = false;

  constructor(
    private chessService: ChessWebApiService,
    private dialog: MatDialog,
    private stockfish: StockfishEvaluationApiService,
    private cd: ChangeDetectorRef,
  ) {}

  @ViewChild(ChessBoardComponent) chessboard!: ChessBoardComponent;
  @ViewChild('slider') slideBar!: ElementRef;

  ngOnInit() {
    this.newGame();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isSlideBarFocused()) {
      if (event.key === 'ArrowLeft') {
        this.undo();
      } else if (event.key === 'ArrowRight') {
        this.move();
      }
    }
  }

  protected newGame() {
    this.disableBar = false;
    this.getPlayer()
      .then(() => {
        return this.getPlayerGamesUrl();
      })
      .then(() => {
        return this.getPlayerGames();
      });
    this.cd.markForCheck();
  }

  protected move() {
    let fen: string = this.chessboard.move();
    this.stockfish.setEvaluation(fen);
  }

  protected reset() {
    this.stockfish.resetEvaluation();
    this.chessboard.reset();
  }

  protected flipBoard() {
    this.chessboard.flipBoard();
  }

  protected undo() {
    let fen: string = this.chessboard.undo();
    if (fen === 'reset') {
      this.stockfish.resetEvaluation();
    } else {
      this.stockfish.setEvaluation(fen);
    }
  }

  private async getPlayer() {
    let countryCode = COUNTRY_CODES[randomNumber(0, COUNTRY_CODES.length - 1)];
    const data = await this.chessService.getPlayer(countryCode);
    let number = randomNumber(0, data.data.players.length);
    this.player = data.data.players[number];
  }

  private async getPlayerGamesUrl() {
    const data = await this.chessService.getPlayerArchives(this.player);
    this.playerGamesUrl = data.data.archives[data.data.archives.length - 1];
  }

  private async getPlayerGames() {
    const data = await this.chessService.getPlayerGames(this.playerGamesUrl);
    let currentGame = data.data.games[data.data.games.length - 1];
    this.gameData = {
      whiteUserName: currentGame.white.username,
      whiteElo: currentGame.white.rating,
      blackUserName: currentGame.black.username,
      blackElo: currentGame.black.rating,
      gameUrl: currentGame.gameUrl,
      pgn: currentGame.pgn,
      moveList: this.pgnToArray(parse(currentGame.pgn, { startRule: 'game' })),
      rules: currentGame.rules,
      timeClass: currentGame.time_class,
      timeControl: currentGame.time_control,
    };
    this.chessboard.setMoveList(this.gameData.moveList);
    this.averageElo = Math.floor(
      (this.gameData?.whiteElo! + this.gameData?.blackElo!) / 2,
    );
  }

  private pgnToArray(game: any) {
    let arr = game.moves;
    let moves = [];
    for (const move of arr) {
      moves.push(move.notation.notation);
    }
    return moves;
  }

  protected openDialog(): void {
    this.disableBar = false;
    if (this.eloGuess.value != null) {
      this.currentGameScore = Math.ceil(
        (Math.min(this.eloGuess.value, this.averageElo ?? 0) /
          Math.max(this.eloGuess.value, this.averageElo ?? 0)) *
          100,
      );
      this.overallScore += this.currentGameScore;
    }

    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        guessedElo: this.eloGuess.value,
        actualElo: this.averageElo,
        currentGameScore: this.currentGameScore,
        overallScore: this.overallScore,
      },
    });

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.reset();
        this.eloGuess.setValue(100);
        this.newGame();
      } else {
        this.disableBar = true;
      }
    });
    this.cd.markForCheck();
  }

  private isSlideBarFocused(): boolean {
    return this.slideBar.nativeElement === document.activeElement;
  }

  protected newGameButton() {
    this.reset();
    this.newGame();
  }
}
