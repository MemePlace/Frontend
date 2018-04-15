import { Component, Inject, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Utils } from '../utils';
import { MemeService } from '../api/meme.service';

@Component({
  selector: 'app-meme-dialog',
  templateUrl: './meme-dialog.component.html',
  providers: [MatDialogModule],
  styleUrls: ['./meme-dialog.component.scss']
})
export class MemeDialogComponent implements OnInit {
  username: string;
  imageLink: string;
  totalVote = 0;
  myVote = 0;
  memeId: number;

  @Output() notifyCard: EventEmitter<number> = new EventEmitter<number>();

  constructor(private memeService: MemeService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.memeId = data.memeId;
    this.fetchMemeDetails();
  }

  ngOnInit() {
  }

  fetchMemeDetails() {
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

  maxCardWidth(): number {
    return Utils.screenWidth * 0.70;
  }

  minCardWidth(): number {
    return Utils.screenWidth * 0.5;
  }

  maxDialogHeight(): number {
    return Utils.screenHeight * 0.9;
  }

  async onClickUpVote() {
    try {
      const promise = (this.myVote === 1) ? this.memeService.deleteMemeVote(this.memeId) : this.memeService.upvoteMeme(this.memeId);
      await promise;

      this.myVote = (this.myVote === 1) ? 0 : 1;
      this.notifyCard.emit(this.myVote);
    } catch (e) {
      this.snackBar.open(`Failed to vote: ${e.message}`, 'Close');
    }
  }

  async onClickDownVote() {
    try {
      const promise = (this.myVote === -1) ? this.memeService.deleteMemeVote(this.memeId) : this.memeService.downvoteMeme(this.memeId);
      await promise;

      this.myVote = (this.myVote === -1) ? 0 : -1;
      this.notifyCard.emit(this.myVote);
    } catch (e) {
      this.snackBar.open(`Failed to vote: ${e.message}`, 'Close');
    }
  }

}
