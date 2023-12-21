import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    standalone: true,
    imports: [RouterLink],
})
export class HomePageComponent {}
