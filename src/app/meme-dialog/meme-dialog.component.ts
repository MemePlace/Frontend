import { Component, Inject, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogModule, MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatDialogRef} from '@angular/material';
import { Utils } from '../utils';
import {CommentList, Comment, MemeService, Meme} from '../api/meme.service';
import { UserService } from '../api/user.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meme-dialog',
  templateUrl: './meme-dialog.component.html',
  providers: [MatDialogModule],
  styleUrls: ['./meme-dialog.component.scss']
})
export class MemeDialogComponent implements OnInit {
  username: string;
  imageLink: string;
  createdAt: string;
  totalVote = 0;
  myVote = 0;
  memeId: number;
  meme: Meme;
  comments: Comment[] = [];
  form: FormGroup;
  oldUrl: string;
  utils = Utils;

  @Output() notifyCard: EventEmitter<number> = new EventEmitter<number>();

  constructor(private dialogRef: MatDialogRef<MemeDialogComponent>,
              private memeService: MemeService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public userService: UserService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private location: Location) {
    this.memeId = data.memeId;
    this.fetchMemeDetails();
    if (this.userService.isLoggedIn()) {
      this.createForm();
    }

    this.oldUrl = this.location.path();
  }

  ngOnInit() {
  }

  fetchMemeDetails() {
    this.memeService.getMemeDetails(this.memeId).then((meme) => {
      this.meme = meme;
      this.imageLink = meme.Image.link;
      this.username = meme.creator.username;
      this.totalVote = meme.totalVote || 0;
      this.createdAt = meme.createdAt;

      if (meme.myVote) {
        this.myVote =  meme.myVote.diff;
        this.totalVote -= this.myVote; // we represent the total as myVote + totalVote
      }

      // Push the meme URL to history
      this.location.go(`/c/${meme.Community.name}/m/${this.memeId}`);

      // Change back the URL if we close and the old one is defined
      this.dialogRef.beforeClose().subscribe(() => {
        if ((this.oldUrl && this.oldUrl !== `/c/${meme.Community.name}/m/${this.memeId}`) || this.oldUrl === '') {
          this.location.go(this.oldUrl);
        }
      });

    });
    this.getComments();
  }

  getComments() {
    this.memeService.getMemeComments(this.memeId).then((list: CommentList) => {
      this.comments = list.comments;
    });
  }

  createForm() {
    this.form = this.fb.group({
      commentText: ['']
    });
  }

  submitComment() {
    if (this.form.value.commentText !== '') {
      this.memeService.addMemeComment(this.memeId, this.form.value.commentText).then((reply) => {
        this.getComments();
      });
      this.createForm(); // reset the form
    }
  }

  deleteComment(commentId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.memeService.deleteMemeComment(this.memeId, commentId).then((value: ({} | void)) => {
          this.getComments();
        });
      }
    });
  }

  minImgWidth(): number {
    return Utils.screenWidth * 0.30;
  }

  maxImgWidth(): number {
    return Utils.screenWidth * 0.7;
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
