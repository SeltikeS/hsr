import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculateCharacterDto } from '../dto/calculate-character.dto';

@Injectable({
  providedIn: 'root',
})
export class CalculatorApiService {
  private http = inject(HttpClient);

  private url = 'http://localhost:8999/api';

  public calculate(characters: CalculateCharacterDto[]) {
    return this.http.post(`${this.url}/calculate`, characters);
  }
}
