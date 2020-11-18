import { RoutineStore, RoutineState } from './routine.store';
import { Routine } from '../models/routine.model';
import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutineQuery extends QueryEntity<RoutineState, Routine> {
  constructor(protected routineStore: RoutineStore) {
    super(routineStore);
  }

  public getStep(step: number): Observable<Routine> {
     return this.selectEntity(t => t.step === step);
  }

  public getStepList() {
    return this.selectAll();
  }
}
