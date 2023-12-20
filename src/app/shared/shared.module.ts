import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../feature/components/popup/popup.component';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule, PopupComponent],
  exports: [PopupComponent],
})
export class SharedModule {}
