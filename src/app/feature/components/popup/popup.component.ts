import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PopupScore } from '../../../core/models/popup-score';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule],
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PopupScore) {}
}
