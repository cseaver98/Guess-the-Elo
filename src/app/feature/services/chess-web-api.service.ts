import { Injectable } from '@angular/core';
import { parse } from '@mliebelt/pgn-parser';

@Injectable({
  providedIn: 'root'
})
export class ChessWebApiService {
  countryCode = 'IT';
  playUserName = '';
  monthArchive = '';
  year = '';
  month = '';
  pgn = '';
  blackElo = 0;
  whiteElo = 0;
  timeClass = '';
  game: any = null;
  moveList: string[] = [];
  moves = '';

  ChessWebAPI = require('chess-web-api');
  chessApiService = new this.ChessWebAPI({
    queue: true,
  });

  async getRandomPlayer(response: any, error: any): Promise<void> {
    this.playUserName = await response.body.players[Math.floor(Math.random() * response.body.players.length)];
    this.monthArchive = this.chessApiService.dispatch(this.chessApiService.getPlayerMonthlyArchives, this.getMonthArchive, [this.playUserName]);
  }

  async getMonthArchive(response: any, error: any): Promise<void> {
    this.monthArchive = await response.body.archives[Math.floor(Math.random() * response.body.archives.length)];
    this.getMonthAndYear(this.monthArchive);
  }

  async getPGN(response: any, error: any): Promise<void> {
    const res = await response.body.games[0];
    this.pgn = res.pgn;
    this.game = parse(this.pgn, { startRule: "game" });
    this.getBlackElo(res);
    this.getWhiteElo(res);
    this.getTimeClass(res);
    this.pgnToArray(this.game);
  }

  pgnToArray(game: any): void {
    const arr = game.moves;
    for (const move of arr) {
      this.moveList.push(move.notation.notation);
    }
    this.moves = this.moveList.toString();
  }

  getMonthAndYear(archive: string): void {
    const arr = archive.split("/");
    this.year = arr[7];
    this.month = arr[8];
  }

  getBlackElo(res: any): void {
    this.blackElo = res.black.rating;
  }

  getWhiteElo(res: any): void {
    this.whiteElo = res.white.rating;
  }

  getTimeClass(res: any): void {
    this.timeClass = res.time_class;
  }
}
