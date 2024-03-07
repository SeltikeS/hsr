import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import cones from '@server/clones.json';
import relics from '@server/relics.json';
import { ConeRefinement, ConeType } from '@shared/types/cone.type';
import { RelicType } from '@shared/types/relic.type';
import { CharacterEdalon, CharacterName } from '@shared/types/character.type';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'hsr-calculator-grid',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './calculator-grid.component.html',
  styleUrl: './calculator-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorGridComponent implements OnInit {
  protected cones: ConeType[] = cones;
  protected relics: RelicType[] = relics;
  protected characters: CharacterName[] = Object.values(CharacterName);
  protected edalons: CharacterEdalon[] = Object.values(CharacterEdalon);
  protected refinements: ConeRefinement[] = Object.values(ConeRefinement);

  protected form = new FormGroup({
    items: new FormArray([this.getEmptyFormItem()]),
  });

  protected get formItems() {
    return this.form.controls.items.controls as FormGroup[];
  }

  public ngOnInit() {
    console.log(cones);
    console.log(relics);
  }

  protected onAddNewItem() {
    this.formItems.push(this.getEmptyFormItem());
  }

  private getEmptyFormItem() {
    return new FormGroup({
      character: new FormControl(''),
      edalon: new FormControl(''),
      cone: new FormControl(''),
      refinement: new FormControl(''),
    });
  }
}
