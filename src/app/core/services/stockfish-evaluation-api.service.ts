import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockfishEvaluationApiService {
    async getEvaluation(FEN: string): Promise<any> {
        try {
          const response = await fetch('https://stockfish.online/api/stockfish.php?fen=' + FEN + '&depth=12&mode=eval');
          const data = await response.json();
          return {data, status: response.status};
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      }
}