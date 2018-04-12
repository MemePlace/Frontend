import { Component, Input, OnInit } from '@angular/core';
import { Utils } from '../utils';
import { MemeService } from '../api/meme.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MemeDialogComponent } from '../meme-dialog/meme-dialog.component';

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
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.memeService.getMemeDetails(this.memeId).then((meme) => {
      this.imageLink = meme.Image.link;
      this.username = meme.creator.username;
      this.totalVote = meme.totalVote || 0;

      if (meme.myVote) {
        this.myVote =  meme.myVote.diff;
        this.totalVote -= this.myVote; // we represent the total as myVote + totalVote
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

  async onClickUpVote() {
    try {
      const promise = (this._myVote === 1) ? this.memeService.deleteMemeVote(this.memeId) : this.memeService.upvoteMeme(this.memeId);
      await promise;

      this.myVote = (this._myVote === 1) ? 0 : 1;
    } catch (e) {
      this.snackBar.open(`Failed to vote: ${e.message}`, 'Close');
    }
  }

  async onClickDownVote() {
    try {
      const promise = (this._myVote === -1) ? this.memeService.deleteMemeVote(this.memeId) : this.memeService.downvoteMeme(this.memeId);
      await promise;

      this.myVote = (this._myVote === -1) ? 0 : -1;
    } catch (e) {
      this.snackBar.open(`Failed to vote: ${e.message}`, 'Close');
    }
  }

}
