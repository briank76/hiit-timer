import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Routine } from '../models/routine.model';
import { RoutineQuery } from '../state/routine.query';
import { RoutineStore } from '../state/routine.store';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
    constructor(private routineStore: RoutineStore,
                private routineQuery: RoutineQuery,
                private http: HttpClient) {}

    getWorkoutRoutine(): Observable<Routine[]> {
      return this.http.get<Routine[]>('/assets/json/workout.json');
    }
}
