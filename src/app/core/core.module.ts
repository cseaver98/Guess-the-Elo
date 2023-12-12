import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterLink} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {PopupComponent} from "./popup/popup.component";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    PopupComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    FormsModule
  ]
})
export class CoreModule {
}
