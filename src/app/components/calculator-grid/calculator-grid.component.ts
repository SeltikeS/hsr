import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import cones from '@server/clones.json';
import relics from '@server/relics.json';
import { ConeType } from '@shared/types/cone.type';
import { RelicType } from '@shared/types/relic.type';

@Component({
  selector: 'hsr-calculator-grid',
  standalone: true,
  imports: [],
  templateUrl: './calculator-grid.component.html',
  styleUrl: './calculator-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorGridComponent implements OnInit {
  protected cones: ConeType[] = cones;
  protected relics: RelicType[] = relics;

  public ngOnInit() {
    console.log(cones);
    console.log(relics);
  }
}
