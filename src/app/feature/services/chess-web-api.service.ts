import { Injectable } from '@angular/core';
import { parse } from '@mliebelt/pgn-parser';


@Injectable({
  providedIn: 'root'
})
export class ChessWebApiService {

  async getPlayer(countryCode: string): Promise<any> {
    try {
      const response = await fetch('https://api.chess.com/pub/country/IT/players');
      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
