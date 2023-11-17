import {Component, ViewChild} from '@angular/core';
import {ChessBoardComponent} from "../chess-board/chess-board.component";
import {ChessWebApiService} from '../services/chess-web-api.service';
import {CountryCodes} from "../enums/country-codes";
import {randomNumber} from "../../shared/utilities/random-number";
import {getEnumValueByIndex} from "../../shared/utilities/enum-by-index";

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html'
})
export class PlayPageComponent {
  player: string = '';

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
    let countryCode = getEnumValueByIndex(CountryCodes, (randomNumber(0, 247)));
    this.chessService.getPlayer(countryCode).then((data) => {
      let number = randomNumber(0, data.data.players.length);
      this.player = data.data.players[number];
    });
  }
}
