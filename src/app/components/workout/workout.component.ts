import { Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { map } from 'rxjs/operators';
import { Routine, Workout } from 'src/app/models/routine.model';
import { TimerEventModel } from 'src/app/models/timer-event.model';
import { RoutineService } from 'src/app/services/routine.service';
import { RoutineQuery } from 'src/app/state/routine.query';
import { RoutineStore } from 'src/app/state/routine.store';

@Component({
  selector: 'timer-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, AfterContentChecked {
  @ViewChild('workoutTimer') private workoutTimer: CountdownComponent;
  public workoutActive = false;
  public activeTimerDisplayId = '';
  private timerDisplayId = [
    { id: 'start', value: 'active' },
    { id: 'done', value: 'done' },
    { id: 'notify', value: 'warning' },
    { id: 'pause', value: 'warning'},
    { id: 'restart', value: 'active' }
  ]
  private workoutStepIndex = 1;
  private workoutRepeatIndex = 1;
  private routineStepIndex = 1;
  public routineModel: Routine;
  public workoutModel: Workout;
  public timerConfig: CountdownConfig;
  private _timerDisplayId = 'active';


  constructor(private routineService: RoutineService,
              private routineStore: RoutineStore,
              private routineQuery: RoutineQuery) { }

  ngOnInit(): void {
    this.routineService.getWorkoutRoutine().subscribe(
      (results) => {
        this.routineStore.add(results);
        this.setActiveWorkoutRoutine(this.routineStepIndex);
        this.setActiveWorkout(this.workoutStepIndex);
      },
      (err) => {
        // should redirect or show an error message
        console.log(err);
      }
    )
  }

  ngAfterContentChecked(): void {
    this.activeTimerDisplayId = this._timerDisplayId;
  }

  private setActiveWorkoutRoutine(step: number) {
    this.routineQuery.getStep(step).pipe(
      map(results => this.routineModel = results)
    ).subscribe(results => console.log(this.routineModel))
  }

  private setActiveWorkout(step: number) {
    this.workoutModel = this.routineModel.workout.find((t) => t.step === step);
    this.timerConfig = {
      leftTime: this.workoutModel.time,
      demand: !this.workoutActive,
      notify: [5],
      format: 'mm:ss'
    }
  }

  private getTimerDisplayId(id: string): string {
    let retVal = '';
    const item = this.timerDisplayId.find((t) => t.id === id);
    if (item) {
      retVal = item.value;
    }
    return retVal;
  }

  private gotoNext(): void {
    const workoutStepLength = this.routineModel.workout.length;
    this.workoutStepIndex += 1;
    if (this.workoutStepIndex > workoutStepLength) {
      // we are done with this round of workout
      this.workoutStepIndex = 1;
      this.workoutRepeatIndex += 1;
      if (this.workoutRepeatIndex > this.routineModel.repeat) {
        // we are done repeating workout
        this.workoutRepeatIndex = 1
        this.routineStepIndex += 1;
        console.log(this.routineQuery.getCount());
        if (this.routineStepIndex > this.routineQuery.getCount()) {
          //we are done workout
          this.routineStepIndex = 1;
          this.workoutActive = false;
        } else {
          this.setActiveWorkoutRoutine(this.routineStepIndex);
          this.setActiveWorkout(this.workoutStepIndex);
        }
      } else {
        this.setActiveWorkout(this.workoutStepIndex);
      }
    } else {
      this.setActiveWorkout(this.workoutStepIndex);
    }
  }

  public beginWorkout() {
    if (this.workoutTimer) {
      this.workoutTimer.begin();
    }
  }

  public pauseWorkout() {
    if (this.workoutTimer) {
      this.workoutTimer.pause();
    }
  }

  public handleEvent($event: any): void {
    if ($event) {
      const timeModel: TimerEventModel = $event;
      this._timerDisplayId = this.getTimerDisplayId(timeModel.action);
      switch(timeModel.action) {
        case 'start':
        case 'restart':
          this.workoutActive = true;
          break;
        case 'pause':
          this.workoutActive = false;
          break;
        case 'notify':
          break;
        case 'done':
          this.gotoNext();
          // needed as restart doesn't trigger ngAfterContentChecked
          if (this.workoutActive) {
            this._timerDisplayId = this.getTimerDisplayId('start');
          }
          break;
      }
    }
  }
}
