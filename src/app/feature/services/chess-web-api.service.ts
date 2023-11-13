import { Injectable } from '@angular/core';
import { parse } from '@mliebelt/pgn-parser';

@Injectable({
  providedIn: 'root'
})
export class ChessWebApiService {

  countryCode = 'IT';
  playUserName = '';
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

  async function getRandomPlayer(response: any, error: any): Promise<void> {
    playUserName = await response.body.players[Math.floor(Math.random() * response.body.players.length)];
    monthArchive = chessAPI.dispatch(chessAPI.getPlayerMonthlyArchives, getMonthArchive, [playUserName]);
  }

  async function getMonthArchive(response: any, error: any): Promise<void> {
    monthArchive = await response.body.archives[Math.floor(Math.random() * response.body.archives.length)];
    getMonthAndYear(monthArchive);
  }

  async function getPGN(response: any, error: any): Promise<void> {
    const res = await response.body.games[0];
    pgn = res.pgn;
    game = await parse(pgn, { startRule: "game" });
    getBlackElo(res);
    getWhiteElo(res);
    getTimeClass(res);

    moveList = pgnToArray(game);
  }

  function pgnToArray(game: any): void {
    const arr = game.moves;
    for (const move of arr) {
      moveList.push(move.notation.notation);
    }
    moves = moveList.toString();
  }

  function getMonthAndYear(archive: string): void {
    const arr = archive.split("/");
    year = arr[7];
    month = arr[8];
  }

  function getBlackElo(res: any): void {
    blackElo = res.black.rating;
  }

  function getWhiteElo(res: any): void {
    whiteElo = res.white.rating;
  }

  function getTimeClass(res: any): void {
    timeClass = res.time_class;
  }

}
