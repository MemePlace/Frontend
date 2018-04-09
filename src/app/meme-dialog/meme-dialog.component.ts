import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../api/user.service';

import {MatDialogModule, MatDialogRef, MatSnackBar} from '@angular/material';
import {Utils} from '../utils';

@Component({
  selector: 'app-meme-dialog',
  templateUrl: './meme-dialog.component.html',
  providers: [MatDialogModule],
  styleUrls: ['./meme-dialog.component.scss']
})
export class MemeDialogComponent implements OnInit {
  @Input() imageHeight: number;
  @Input() username: string;
  @Input() image: string;



  constructor(public dialogRef: MatDialogRef<MemeDialogComponent>,
              private userService: UserService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  maxCardWidth(height: number): number {
    return Utils.screenWidth * 0.95;
  }

  minCardWidth(height: number): number {
    if (Utils.isMobile) {
      return Utils.screenWidth * 0.95;
    } else {
      return 0;
    }
  }

  checkHeight(height: number): number {
    if (Utils.isMobile) {
      return null;
    } else {
      return height;
    }
  }

}
