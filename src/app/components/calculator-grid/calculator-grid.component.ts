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
import { catchError, debounceTime, EMPTY, map, switchMap } from 'rxjs';
import { CalculateCharacterDto } from '../../api/dto/calculate-character.dto';
import { CalculatorApiService } from '../../api/service/calculator-api.service';
import { error } from '@angular/compiler-cli/src/transformers/util';

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
    items: new FormArray([]),
  });

  protected get formItems() {
    return this.form.controls.items.controls as FormGroup[];
  }

  public ngOnInit() {}

  protected onAddNewItem() {
    this.formItems.push(this.getEmptyFormItem());
    this.formItems
      ?.at(-1)
      ?.valueChanges.pipe(
        map((item) => {
          console.log(item);
          const form = item as unknown as CalculatorForm;
          return {
            name: form?.character,
            eidolon: form?.edalon,
            coneName: form?.cone,
            coneRefinement: form?.refinement,
            locked: false,
            ignoreSets: false,
          };
        }),
        debounceTime(400),
        switchMap((dto: CalculateCharacterDto) => {
          if (
            dto?.name === '' ||
            dto?.coneName === '' ||
            (dto?.eidolon as any) === '' ||
            (dto?.coneRefinement as any) === '' ||
            dto?.name === '--- select ---' ||
            dto?.coneName === '--- select ---' ||
            (dto?.eidolon as any) === '--- select ---' ||
            (dto?.coneRefinement as any) === '--- select ---'
          ) {
            return EMPTY;
          }
          return this.calculatorApi
            .calculate([
              {
                ...dto,
                eidolon: +dto?.eidolon,
                coneRefinement: +dto?.coneRefinement,
              },
            ])
            .pipe(
              catchError((error) => {
                console.error(error);
                return EMPTY;
              }),
            );
        }),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
        console.log(response);
      });
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
  character: string;
  edalon: number;
  cone: string;
  refinement: number;
};
