import { Rules } from './rules';
import { TimeClass } from './time-class';

export interface Game {
  [key: string]: any;
  whiteUserName: string;
  whiteElo: number;
  blackUserName: string;
  blackElo: number;
  gameUrl: string;
  pgn: string;
  moveList: string[];
  rules: Rules;
  timeClass: TimeClass;
  timeControl: string;
}
