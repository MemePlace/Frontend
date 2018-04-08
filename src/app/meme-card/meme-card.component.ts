import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../api/user.service';
import {Utils} from '../utils';
import {MatDialog, MatSnackBar} from '@angular/material';
import {MemeDialogComponent} from "../meme-dialog/meme-dialog.component";

@Component({
  selector: 'app-meme-card',
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.scss']
})
export class MemeCardComponent implements OnInit {
  @Input() imageHeight: number;
  @Input() username: string;
  @Input() image: string;

  voteCount = 0;
  voted = 0;

  constructor(public dialog: MatDialog,
              public userService: UserService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  dialogPage() {
    const openDialog = this.dialog.open(MemeDialogComponent);
  }

  maxCardWidth(height: number): number {
    if (Utils.isMobile) {
      return Utils.screenWidth * 0.95;
    } else {
      return Math.min(Utils.screenWidth * 0.95, height * 2.5);
    }
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

  onClickUpVote() {
    this.voteCount -= this.voted; // negate a previous vote

    if (this.voted !== 1) {
      this.voteCount++;
      this.voted = 1;
    } else {
      this.voted = 0;
    }
  }

  onClickDownVote() {
    this.voteCount -= this.voted; // negate a previous vote

    if (this.voted !== -1) {
      this.voteCount--;
      this.voted = -1;
    } else {
      this.voted = 0;
    }
  }

}
