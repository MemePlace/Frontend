import {Component, Input, OnInit} from '@angular/core';
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
  dialogInstance: MemeDialogComponent;
  dialogOpen = false;
  @Input() imageHeight: number;
  @Input() memeId: number;

  imageLink = 'data:image/png;base64,ffff';  // ensures no null request being sent
  username: string;

  private _totalVote = 0;

  set totalVote(value: number) {
    this._totalVote = value;
    if (this.dialogOpen) {
      this.dialogInstance.totalVote = value;
    }
  }

  private _myVote = 0;

  set myVote(value: number) {
    this._myVote = value;
    if (this.dialogOpen) {
      this.dialogInstance.myVote = value;
    }
  }

  constructor(private memeService: MemeService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.memeService.getMemeDetails(this.memeId).then((meme) => {
      this.imageLink = meme.link;
      this.username = meme.creator['username'];
      this._totalVote = meme.totalVote || 0;
      if (meme.myVote) {
        this._myVote = meme.myVote['diff'];
      }
    });
  }

  dialogPage() {
    if (!Utils.isMobile) {
      const dialogRef = this.dialog.open(MemeDialogComponent);
      this.dialogInstance = dialogRef.componentInstance;
      this.dialogOpen = true;
      this.dialogInstance.notifyCard.subscribe((event: number) => {
        if (event === 1) {
          this.onClickUpVote();
        } else { // event === -1 {
          this.onClickDownVote();
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.dialogOpen = false;
      });
      this.dialogInstance.username = this.username;
      this.dialogInstance.image = this.imageLink;
      this.dialogInstance.totalVote = this._totalVote;
      this.dialogInstance.myVote = this._myVote;
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
    if (this._myVote === 1) {
      this.memeService.deleteMemeVote(this.memeId).then((value) => {
        this.myVote = value;
        this.totalVote = this._totalVote - 1;
      });
    } else {
      this.memeService.upvoteMeme(this.memeId).then((memeVote) => {
        if (this._myVote !== 0) {
          this.totalVote = this._totalVote + 2;
        } else {
          this.totalVote = this._totalVote + 1;
        }
        this.myVote = memeVote.diff;
      }).catch((err) => {
        console.log(err.toString());
      });
    }
  }

  onClickDownVote() {
    if (this._myVote === -1) {
      this.memeService.deleteMemeVote(this.memeId).then((value) => {
        this.myVote = 0;
        this.totalVote = this._totalVote + 1;
      });
    } else {
      this.memeService.downvoteMeme(this.memeId).then((memeVote) => {
        if (this._myVote !== 0) {
          this.totalVote = this._totalVote - 2;
        } else {
          this.totalVote = this._totalVote - 1;
        }
        this.myVote = memeVote.diff;
      }).catch((err) => {
        console.log(err.toString());
      });
    }
  }

}
