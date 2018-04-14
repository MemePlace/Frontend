import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogModule, MatSnackBar } from '@angular/material';
import { Utils } from '../utils';
import { MemeService } from '../api/meme.service';

@Component({
  selector: 'app-meme-dialog',
  templateUrl: './meme-dialog.component.html',
  providers: [MatDialogModule],
  styleUrls: ['./meme-dialog.component.scss']
})
export class MemeDialogComponent implements OnInit {
  @Input() username: string;
  @Input() imageLink: string;
  @Input() totalVote: number;
  @Input() myVote: number;
  @Input() memeId: number;

  @Output() notifyCard: EventEmitter<number> = new EventEmitter<number>();

  constructor(private memeService: MemeService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
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
