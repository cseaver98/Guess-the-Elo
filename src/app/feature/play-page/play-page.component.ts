import {Component, ViewChild, OnInit} from '@angular/core';
import {ChessBoardComponent} from "../chess-board/chess-board.component";
import {ChessWebApiService} from '../services/chess-web-api.service';
import {COUNTRY_CODES} from "../../shared/utilities/global-variables/country-codes";
import {randomNumber} from "../../shared/utilities/random-number";
import {parse} from '@mliebelt/pgn-parser'
import {Game} from "../model/game";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html'
})
export class PlayPageComponent implements OnInit {
  player: string = '';
  playerGamesUrl: string = '';
  gameData?: Game;

  constructor(private chessService: ChessWebApiService) {}

  @ViewChild(ChessBoardComponent) chessboard!: ChessBoardComponent;

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.reset();
    this.getPlayer().then(() => {
      return this.getPlayerGamesUrl();
    }).then(() => {
      return this.getPlayerGames();
    });
  }

  eloGuess: FormControl<string> = new FormControl<string>({
    eloText: ''
  });

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

  getPlayer() {
    let countryCode = COUNTRY_CODES[randomNumber(0, COUNTRY_CODES.length - 1)];
    return this.chessService.getPlayer(countryCode).then((data) => {
      let number = randomNumber(0, data.data.players.length);
      this.player = data.data.players[number];
    });
  }

  getPlayerGamesUrl() {
    return this.chessService.getPlayerArchives(this.player).then((data) => {
      this.playerGamesUrl = data.data.archives[data.data.archives.length - 1];
    });
  }

  getPlayerGames() {
    return this.chessService.getPlayerGames(this.playerGamesUrl).then((data) => {
      let currentGame = data.data.games[data.data.games.length - 1];
      console.log(currentGame);
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
      }
      this.chessboard.setMoveList(this.gameData.moveList);
    });
  }

  pgnToArray(game: any) {
    let arr = game.moves;
    let moves = [];
    for (const move of arr) {
      moves.push(move.notation.notation);
    }
    return moves;
  }

  getGameKeys(obj: Game): string[] {
    return Object.keys(obj || {});
  }
}
