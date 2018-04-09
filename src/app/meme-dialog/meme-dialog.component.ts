import {Component, OnInit} from '@angular/core';
import {UserService} from '../api/user.service';

import {MatDialogModule, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-meme-dialog',
  templateUrl: './meme-dialog.component.html',
  providers: [MatDialogModule],
  styleUrls: ['./meme-dialog.component.scss']
})
export class MemeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MemeDialogComponent>,
              private userService: UserService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

}
