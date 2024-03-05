import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hsr-calculator-grid',
  standalone: true,
  imports: [],
  templateUrl: './calculator-grid.component.html',
  styleUrl: './calculator-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorGridComponent {}
