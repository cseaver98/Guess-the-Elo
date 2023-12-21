import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { StockfishEvaluationApiService } from '../../../core/services/stockfish-evaluation-api.service';
import {Subject, takeUntil} from "rxjs";
import {NgStyle} from "@angular/common";

/**
 * @title Determinate progress-bar
 */
@Component({
  selector: 'app-evaluation-bar',
  templateUrl: './evaluation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgStyle
  ]
})
export class EvaluationBarComponent {
  private unsubscribe$ = new Subject();
  private cap: number = 5;
  protected percentage: number = 50;

  constructor(
    private stockfishService: StockfishEvaluationApiService,
    private cd: ChangeDetectorRef
  ) {
    this.stockfishService.evaluation
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) =>{
        this.setPercentage(data);
        this.cd.markForCheck();
      })
  }

  setPercentage(evaluation: number) {
    this.percentage = ((this.limitPercentage(evaluation) + this.cap) / (this.cap * 2)) * 100;
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
