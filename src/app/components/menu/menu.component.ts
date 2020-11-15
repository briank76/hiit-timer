import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timer-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public time = 30;
  private interval: any;
  constructor() { }

  ngOnInit(): void {
  }

  
}
