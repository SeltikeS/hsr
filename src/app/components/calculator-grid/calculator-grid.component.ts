import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import cones from '@server/clones.json';
import relics from '@server/relics.json';
import characters from '@server/characters.json';
import { ConeRefinement, ConeType } from '@shared/types/cone.type';
import { RelicType } from '@shared/types/relic.type';
import { CharacterEdalon, CharacterType } from '@shared/types/character.type';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, map, switchMap } from 'rxjs';
import { CalculateCharacterDto } from '../../api/dto/calculate-character.dto';
import { CalculatorApiService } from '../../api/service/calculator-api.service';

@Component({
  selector: 'hsr-calculator-grid',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [CalculatorApiService],
  templateUrl: './calculator-grid.component.html',
  styleUrl: './calculator-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorGridComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private calculatorApi = inject(CalculatorApiService);

  protected cones: ConeType[] = cones;
  protected relics: RelicType[] = relics;
  protected characters: CharacterType[] = characters;
  protected edalons: CharacterEdalon[] = Object.values(CharacterEdalon);
  protected refinements: ConeRefinement[] = Object.values(ConeRefinement);

  protected form = new FormGroup({
    items: new FormArray([this.getEmptyFormItem()]),
  });

  protected get formItems() {
    return this.form.controls.items.controls as FormGroup[];
  }

  public ngOnInit() {
    this.form.controls.items.valueChanges
      .pipe(
        map((items) => {
          return items.map((item): CalculateCharacterDto => {
            const form = item as unknown as CalculatorForm;
            return {
              name: form?.character?.name,
              eidolon: form?.edalon,
              coneName: form?.cone?.name,
              coneRefinement: form?.refinement,
              locked: false,
              ignoreSets: false,
            };
          });
        }),
        debounceTime(400),
        switchMap((dtos: CalculateCharacterDto[]) => {
          return this.calculatorApi.calculate(dtos);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
        console.log(response);
      });
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

type CalculatorForm = {
  character: CharacterType;
  edalon: number;
  cone: ConeType;
  refinement: number;
};
