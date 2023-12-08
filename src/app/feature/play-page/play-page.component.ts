import {Component, ViewChild} from '@angular/core';
import {ChessBoardComponent} from "../chess-board/chess-board.component";
import {ChessWebApiService} from '../services/chess-web-api.service';
import {COUNTRY_CODES} from "../../shared/utilities/global-variables/country-codes";
import {randomNumber} from "../../shared/utilities/random-number";
import {parse} from '@mliebelt/pgn-parser'
import {Game} from "../model/game";

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html'
})
export class PlayPageComponent {
  player: string = '';
  playerGamesUrl: string = '';
  game?: Game;

  constructor(private chessService: ChessWebApiService) {}

  @ViewChild(ChessBoardComponent) chessboard!: ChessBoardComponent;

  ngOnInit() {
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

  getPlayer() {
    let countryCode = COUNTRY_CODES[randomNumber(0, COUNTRY_CODES.length - 1)];
    return this.chessService.getPlayer(countryCode).then((data) => {
      let number = randomNumber(0, data.data.players.length);
      this.player = data.data.players[number];

      console.log(`inside inside player ${this.player}`)
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
      this.game = {
        whiteUserName: currentGame.whiteUserName,
        whiteElo: currentGame.white.rating,
        blackUserName: currentGame.blackUserName,
        blackElo: currentGame.black.rating,
        gameUrl: currentGame.gameUrl,
        pgn: currentGame.pgn,
        moveList: this.pgnToArray(parse(currentGame.pgn, {startRule: "game"})),
        rules: currentGame.rules,
        timeClass: currentGame.timeClass,
        timeControl: currentGame.timeControl,
      }
      this.chessboard.setMoveList(this.game.moveList);
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
}
