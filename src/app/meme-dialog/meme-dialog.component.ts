import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../api/user.service';

import {MatDialogModule, MatDialogRef, MatSnackBar} from '@angular/material';
import {Utils} from '../utils';
import {MemeCardComponent} from '../meme-card/meme-card.component';

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
  @Input() parent: MemeCardComponent;
  @Input() voteCount: number;
  @Input() voted: number;

  constructor(public dialogRef: MatDialogRef<MemeDialogComponent>,
              private userService: UserService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  maxCardWidth(height: number): number {
    return Utils.screenWidth * 0.70;
  }

  minCardWidth(height: number): number {
    if (Utils.isMobile) {
      return Utils.screenWidth * 0.70;
    } else {
      return Utils.screenWidth * 0.5;
    }
  }

  maxDialogHeight(): number {
    return Utils.screenHeight * 0.9;
  }

  checkHeight(height: number): number {
    if (Utils.isMobile) {
      return null;
    } else {
      return height;
    }
  }


  onClickUpVote() {
    this.parent.onClickUpVote();
    this.voteCount = this.parent.voteCount;
    this.voted = this.parent.voted;
  }

  onClickDownVote() {
    this.parent.onClickDownVote();
    this.voteCount = this.parent.voteCount;
    this.voted = this.parent.voted;
  }

}
