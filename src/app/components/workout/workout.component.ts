import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { TimerEventModel } from 'src/app/models/timer-event.model';

@Component({
  selector: 'timer-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  @ViewChild('workoutTimer') private workoutTimer: CountdownComponent;
  public workoutActive = false;

  constructor() { }

  ngOnInit(): void {
  }

  public beginWorkout() {
    if (this.workoutTimer) {
      this.workoutTimer.begin();
    }
  }

  public pauseWorkout() {
    if (this.workoutTimer) {
      this.workoutTimer.pause();    }
  }

  public handleEvent($event): void {
    if ($event) {
      const timeModel: TimerEventModel = $event;
      switch(timeModel.action) {
        case 'start':
          this.workoutActive = true;
          break;
        case 'pause':
          this.workoutActive = false;
          break;
        case 'notify':
          break;
        case 'done':
          break;
      }
    }
  }
}
