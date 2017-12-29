import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ku-kubit-notification-dialog',
  templateUrl: './kubit-notification-dialog.component.html',
  styleUrls: ['./kubit-notification-dialog.component.scss']
})
export class KubitNotificationDialogComponent implements OnInit {
  title = 'Notification';
  message = '';

  constructor(public dialogRef: MatDialogRef<KubitNotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = data.title;
      this.message = data.message;
  }

  ngOnInit() {
  }

}
