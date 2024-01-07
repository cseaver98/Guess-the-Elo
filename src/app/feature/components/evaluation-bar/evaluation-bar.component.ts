import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { StockfishEvaluationApiService } from '../../../core/services/stockfish-evaluation-api.service';
import { Subject, takeUntil } from 'rxjs';
import { NgStyle, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * @title Determinate progress-bar
 */
@Component({
  selector: 'app-evaluation-bar',
  templateUrl: './evaluation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgStyle, NgIf, MatTooltipModule],
})
export class EvaluationBarComponent {
  private unsubscribe$ = new Subject();
  private cap: number = 5;
  protected percentage: number = 50;
  protected evaluation: string = '0.00';

  constructor(
    private stockfishService: StockfishEvaluationApiService,
    private cd: ChangeDetectorRef,
  ) {
    this.stockfishService.evaluation
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.setPercentage(data);
        this.cd.markForCheck();
      });
  }

  setPercentage(evaluation: string) {
    let evaluationNumber = parseFloat(evaluation);
    if (!isNaN(evaluationNumber) && isFinite(evaluationNumber)) {
      this.evaluation =
        evaluationNumber > 0
          ? '+' + evaluationNumber.toFixed(2).toString()
          : evaluationNumber.toFixed(2).toString();
      this.percentage =
        ((this.limitPercentage(evaluationNumber) + this.cap) / (this.cap * 2)) *
        100;
    } else {
      this.evaluation = evaluation;
      if (evaluation.includes('White')) {
        this.percentage = 0;
      } else if (this.evaluation.includes('Black')) {
        this.percentage = 100;
      }
    }
  }

  limitPercentage(val: number): number {
    val = val * -1;
    return Math.min(Math.max(val, -1 * this.cap), this.cap);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
