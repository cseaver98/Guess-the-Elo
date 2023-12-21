import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StockfishEvaluationApiService } from '../../../core/services/stockfish-evaluation-api.service';

/**
 * @title Determinate progress-bar
 */
@Component({
  selector: 'app-evaluation-bar',
  templateUrl: './evaluation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class EvaluationBarComponent {

  constructor(private stockfishService: StockfishEvaluationApiService) {}

  private cap: number = 5;

  protected percentage: number = 0;

  setPercentage(evaluation: number) {
    console.log(evaluation)
    this.percentage = ((this.limitPercentage(evaluation) + this.cap) / (this.cap * 2)) * 100;
  }

  limitPercentage(val: number): number {
    val = val * -1;
    return Math.min(Math.max(val, -1 * this.cap), this.cap);
  }

  async setEvaluation(fen: string) {
    console.log(fen)
    const result = await this.stockfishService.getEvaluation(fen);
    console.log(result)
    const parsedResult = this.parseEvaluation(result.data.data)
    if (parsedResult) {
      this.setPercentage(parsedResult);
    }
    else {
      this.setPercentage(0);
    }
  } 

  parseEvaluation(result: string) {
    const regexPattern = /-?\d+\.\d+/;

    const match = result.match(regexPattern);

    if (match && match.length > 0) {
      const extractedNumber = parseFloat(match[0]);
      return extractedNumber;
    }
  
    return null;
  }
}
