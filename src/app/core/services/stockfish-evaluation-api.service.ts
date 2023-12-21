import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class StockfishEvaluationApiService {
  private evaluation$: BehaviorSubject<number> = new BehaviorSubject(0);

  private async getEvaluation(FEN: string): Promise<any> {
    try {
      const response = await fetch(
        'https://stockfish.online/api/stockfish.php?fen=' +
          FEN +
          '&depth=12&mode=eval',
      );
      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  public setEvaluation(fen: string): void {
    this.getEvaluation(fen).then(result => {
      const parsedResult = this.parseEvaluation(result.data.data);
      if (parsedResult) {
        this.evaluation$.next(parsedResult);
      } else {
        this.evaluation$.next(0);
      }
    }).catch(error => {
      throw 'Evaluation bar error';
    });
  }


  private parseEvaluation(result: string) {
    const regexPattern = /-?\d+\.\d+/;

    const match = result.match(regexPattern);

    if (match && match.length > 0) {
      return parseFloat(match[0]);
    }

    return null;
  }

  get evaluation(): Observable<number> {
    return this.evaluation$.asObservable();
  }
}
