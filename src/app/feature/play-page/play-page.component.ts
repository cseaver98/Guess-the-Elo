import {Component, ViewChild} from '@angular/core';
import {ChessBoardComponent} from "../chess-board/chess-board.component";
import {ChessWebApiService} from '../services/chess-web-api.service';
import {COUNTRY_CODES} from "../../shared/utilities/global-variables/country-codes";
import {randomNumber} from "../../shared/utilities/random-number";

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html'
})
export class PlayPageComponent {
  player: string = '';
  playerGamesUrl: string = '';
  constructor(private chessService: ChessWebApiService) {
  }

  @ViewChild(ChessBoardComponent) chessboard!: ChessBoardComponent;

  resetBoard() {
    this.chessboard.resetBoard();
  }

  undo() {
    this.chessboard.undoMove();
  }

  reverse() {
    this.chessboard.reverseBoard();
  }

  getPlayer() {
    let countryCode = COUNTRY_CODES[randomNumber(0, COUNTRY_CODES.length - 1)];
    this.chessService.getPlayer(countryCode).then((data) => {
      let number = randomNumber(0, data.data.players.length);
      this.player = data.data.players[number];
    });
  }

  getPlayerGamesUrl() {
    this.chessService.getPlayerArchives(this.player).then((data) => {
      this.playerGamesUrl = data.data.archives[data.data.archives.length-1];
    });
  }

  getPlayerGames() {
    this.chessService.getPlayerGames(this.playerGamesUrl).then((data) => {
      console.log(data);
    });
  }
}

