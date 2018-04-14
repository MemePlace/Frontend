import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Utils } from '../utils';
import { MemeService } from '../api/meme.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MemeDialogComponent } from '../meme-dialog/meme-dialog.component';
import { UserService } from '../api/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-meme-card',
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.scss']
})
export class MemeCardComponent implements OnInit, OnDestroy {
  @Input() imageHeight: number;
  @Input() memeId: number;

  imageLink = 'data:image/png;base64,ffff';  // ensures no null request being sent
  username: string;
  totalVote = 0;
  myVote = 0;

  loggedInSubscription: Subscription;

  constructor(private memeService: MemeService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loggedInSubscription = this.userService.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // get new vote amount by refetching the meme
        this.fetchMemeDetails();
      } else if (this.myVote !== 0) {
        // Reset my vote and add it to the total
        this.totalVote += this.myVote;
        this.myVote = 0;
      }
    });

    this.fetchMemeDetails();
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

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }

  dialogPage() {
    if (!Utils.isMobile) {
      const dialogRef = this.dialog.open(MemeDialogComponent, {
        data: { username: this.username,
                imageLink: this.imageLink,
                totalVote: this.totalVote,
                myVote: this.myVote,
                memeId: this.memeId },
      });
      const dialogInstance = dialogRef.componentInstance;
      dialogInstance.notifyCard.subscribe((vote: number) => {
        this.myVote = vote;
      });
      // dialogInstance.username = this.username;
      // dialogInstance.imageLink = this.imageLink;
      // dialogInstance.totalVote = this.totalVote;
      // dialogInstance.myVote = this.myVote;
      // dialogInstance.memeId = this.memeId;
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
      const promise = (this.myVote === 1) ? this.memeService.deleteMemeVote(this.memeId) : this.memeService.upvoteMeme(this.memeId);
      await promise;

      this.myVote = (this.myVote === 1) ? 0 : 1;
    } catch (e) {
      this.snackBar.open(`Failed to vote: ${e.message}`, 'Close');
    }
  }

  async onClickDownVote() {
    try {
      const promise = (this.myVote === -1) ? this.memeService.deleteMemeVote(this.memeId) : this.memeService.downvoteMeme(this.memeId);
      await promise;

      this.myVote = (this.myVote === -1) ? 0 : -1;
    } catch (e) {
      this.snackBar.open(`Failed to vote: ${e.message}`, 'Close');
    }
  }

}
