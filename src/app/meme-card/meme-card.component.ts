import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Utils} from '../utils';
import {MemeService} from '../api/meme.service';
import {MatDialog} from '@angular/material';
import {MemeDialogComponent} from '../meme-dialog/meme-dialog.component';

@Component({
  selector: 'app-meme-card',
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.scss']
})
export class MemeCardComponent implements OnInit {
  @Input() imageHeight: number;
  @Input() memeId: number;

  imageLink = 'data:image/png;base64,ffff';  // ensures no null request being sent
  username: string;
  totalVote = 0;
  myVote = 0;

  constructor(private memeService: MemeService,
              public dialog: MatDialog,
              public element: ElementRef) { }

  ngOnInit() {
    this.memeService.getMemeDetails(this.memeId).then((meme) => {
      this.imageLink = meme.link;
      this.username = meme.creator['username'];
      this.totalVote = meme.totalVote || 0;
      if (meme.myVote) {
        this.myVote = meme.myVote['diff'];
      }
    });
  }

  dialogPage() {
    if (!Utils.isMobile) {
      const dialogRef = this.dialog.open(MemeDialogComponent);
      const instance = dialogRef.componentInstance;
      instance.username = this.username;
      instance.image = this.imageLink;
      instance.parent = this;
      instance.totalVote = this.totalVote;
      instance.myVote = this.myVote;
    }
  }

  maxCardWidth(height: number): number {
    if (Utils.isMobile) {
      return Utils.screenWidth * 0.95;
    } else {
      return Math.min(Utils.screenWidth * 0.95, height * 2.5);
    }
  }

  minCardWidth(): number {
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
    if (this.myVote === 1) {
      this.memeService.deleteMemeVote(this.memeId).then((value) => {
        this.myVote = value;
        this.totalVote = this.totalVote - 1;
      });
    } else {
      this.memeService.upvoteMeme(this.memeId).then((memeVote) => {
        if (this.myVote !== 0) {
          this.totalVote = this.totalVote + 2;
        } else {
          this.totalVote = this.totalVote + 1;
        }
        this.myVote = memeVote.diff;
      }).catch((err) => {
        console.log(err.toString());
      });
    }
  }

  onClickDownVote() {
    if (this.myVote === -1) {
      this.memeService.deleteMemeVote(this.memeId).then((value) => {
        this.myVote = 0;
        this.totalVote = this.totalVote + 1;
      });
    } else {
      this.memeService.downvoteMeme(this.memeId).then((memeVote) => {
        if (this.myVote !== 0) {
          this.totalVote = this.totalVote - 2;
        } else {
          this.totalVote = this.totalVote - 1;
        }
        this.myVote = memeVote.diff;
      }).catch((err) => {
        console.log(err.toString());
      });
    }
  }

}
