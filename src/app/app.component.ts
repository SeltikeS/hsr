import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorGridComponent } from './components/calculator-grid/calculator-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalculatorGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
