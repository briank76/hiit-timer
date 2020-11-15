import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { timer } from 'rxjs';
import { TimerEventModel } from 'src/app/models/timer-event.model';

@Component({
  selector: 'timer-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  @ViewChild('workoutTimer') private workoutTimer: CountdownComponent;
  public workoutActive = false;
  public activeTimerDisplayId = '';
  private timerDisplayId = [
    { id: 'start', value: 'active' },
    { id: 'done', value: 'done' },
    { id: 'notify', value: 'warning' },
    { id: 'pause', value: 'warning'}
  ]

  constructor() { }

  ngOnInit(): void {
    this.activeTimerDisplayId = 'active';
  }

  private getTimerDisplayId(id: string): string {
    let retVal = '';
    const item = this.timerDisplayId.find((t) => t.id === id);
    if (item) {
      retVal = item.value;
    }
    return retVal;
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
    console.log($event);
    if ($event) {
      const timeModel: TimerEventModel = $event;
      const timerDisplayId = this.getTimerDisplayId(timeModel.action);
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
      this.activeTimerDisplayId = timerDisplayId;
    }
  }
}
