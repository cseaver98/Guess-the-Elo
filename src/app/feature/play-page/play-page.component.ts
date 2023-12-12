import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ChessBoardComponent} from "../chess-board/chess-board.component";
import {ChessWebApiService} from '../services/chess-web-api.service';
import {COUNTRY_CODES} from "../../shared/utilities/global-variables/country-codes";
import {randomNumber} from "../../shared/utilities/random-number";
import {parse} from '@mliebelt/pgn-parser'
import {Game} from "../model/game";
import {AbstractControl, FormControl, ValidatorFn} from "@angular/forms";
import {PopupComponent} from "../../core/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html'
})
export class PlayPageComponent implements OnInit {
  player: string = '';
  playerGamesUrl: string = '';
  gameData?: Game;
  eloGuess: FormControl<number | null> = new FormControl(100);
  averageElo: number | null = null;
  disableBar: boolean = false;

  constructor(
    private chessService: ChessWebApiService,
    public dialog: MatDialog
  ) {}

  @ViewChild(ChessBoardComponent) chessboard!: ChessBoardComponent;

  ngOnInit() {
    this.newGame();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.undo();
    } else if (event.key === 'ArrowRight') {
      this.move();
    }
  }

  newGame() {
    this.getPlayer().then(() => {
      return this.getPlayerGamesUrl();
    }).then(() => {
      return this.getPlayerGames();
    });
  }

  move() {
    this.chessboard.move();
  }

  reset() {
    this.chessboard.reset();
  }

  flipBoard() {
    this.chessboard.flipBoard();
  }

  undo() {
    this.chessboard.undo();
  }

  async getPlayer() {
    let countryCode = COUNTRY_CODES[randomNumber(0, COUNTRY_CODES.length - 1)];
    const data = await this.chessService.getPlayer(countryCode);
    let number = randomNumber(0, data.data.players.length);
    this.player = data.data.players[number];
  }

  async getPlayerGamesUrl() {
    const data = await this.chessService.getPlayerArchives(this.player);
    this.playerGamesUrl = data.data.archives[data.data.archives.length - 1];
  }

  async getPlayerGames() {
    const data = await this.chessService.getPlayerGames(this.playerGamesUrl);
    let currentGame = data.data.games[data.data.games.length - 1];
    this.gameData = {
      whiteUserName: currentGame.white.username,
      whiteElo: currentGame.white.rating,
      blackUserName: currentGame.black.username,
      blackElo: currentGame.black.rating,
      gameUrl: currentGame.gameUrl,
      pgn: currentGame.pgn,
      moveList: this.pgnToArray(parse(currentGame.pgn, {startRule: "game"})),
      rules: currentGame.rules,
      timeClass: currentGame.time_class,
      timeControl: currentGame.time_control,
    };
    this.chessboard.setMoveList(this.gameData.moveList);
    this.averageElo = Math.floor((this.gameData?.whiteElo! + this.gameData?.blackElo!) / 2);
  }

  pgnToArray(game: any) {
    let arr = game.moves;
    let moves = [];
    for (const move of arr) {
      moves.push(move.notation.notation);
    }
    return moves;
  }

  openDialog(): void {
    let score: number | null = null;
    if (this.eloGuess.value != null) {
      score = Math.ceil((Math.min(this.eloGuess.value, (this.averageElo ?? 0)) / Math.max(this.eloGuess.value, (this.averageElo ?? 0))) * 100);
    }

    const dialogRef = this.dialog.open(PopupComponent, {
      data: {guessedElo: this.eloGuess.value, actualElo: this.averageElo, score: score},
    });

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.disableBar = false;
        this.reset();
        this.eloGuess.setValue(100);
        this.newGame();
      } else {
        this.disableBar = true;
      }
    });
  }
}
