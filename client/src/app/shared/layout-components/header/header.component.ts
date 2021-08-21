import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
   toggleSidbarForme: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.toggleSidbarForme.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 200);
  }

}
