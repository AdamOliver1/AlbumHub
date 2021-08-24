import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  err = "\err";

  constructor(
    private MdDialogRef: MatDialogRef<ErrorPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.err = data;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.MdDialogRef.close();
    },1700)
  }
}
