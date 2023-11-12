import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class CoreModule { }
