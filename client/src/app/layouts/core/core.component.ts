import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  sideBarOpen = false;
  constructor() { }

  ngOnInit(): void {
  }
  sideBarToggle()
  {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
