import { Component, Input } from '@angular/core';

/**
 * @title Determinate progress-bar
 */
@Component({
  selector: 'app-evaluation-bar',
  templateUrl: './evaluation-bar.component.html',
  standalone: true,
})
export class EvaluationBarComponent {
  @Input()
  evaluation: number = 0;

  cap: number = 5;

  protected percentage: number = ((this.getPercentage(this.evaluation) + this.cap) / (this.cap * 2)) * 100;

  getPercentage(val: number): number {
    val = val * -1;
    return Math.min(Math.max(val, (-1 * this.cap)), this.cap);
  }
}
