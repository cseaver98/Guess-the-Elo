import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PopupScore} from "../../shared/utilities/model/popup-score";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PopupScore){}
}
