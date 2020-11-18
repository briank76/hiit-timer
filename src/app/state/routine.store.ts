import { Routine } from '../models/routine.model'
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { Injectable } from '@angular/core'

export interface RoutineState extends EntityState<Routine, number> {}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({
  name: 'workout-routine'
})
export class RoutineStore extends EntityStore<RoutineState> {
    constructor() {
      super();
    }
  }