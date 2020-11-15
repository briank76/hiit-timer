import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutComponent } from './components/workout/workout.component';

const routes: Routes = [
  {path: 'workout', pathMatch: 'full', component: WorkoutComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
