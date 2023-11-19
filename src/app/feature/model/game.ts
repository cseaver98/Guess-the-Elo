import {Rules} from "./rules";
import {TimeClass} from "./time-class";

export interface Game {
  whiteUserName: string;
  whiteElo: string  ;
  blackUserName: string;
  blackElo: string;
  gameUrl: string;
  pgn: string;
  moveList: string[];
  rules: Rules;
  timeClass: TimeClass;
  timeControl: string;
}
