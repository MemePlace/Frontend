import {Component, Input, OnInit} from '@angular/core';
import {Meme, MemeService} from '../../api/meme.service';
import {Utils} from '../../utils';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-meme-view',
  templateUrl: './meme-view.component.html',
  styleUrls: ['./meme-view.component.scss']
})
export class MemeViewComponent implements OnInit {
  @Input() communityName: string;
  @Input() sort = 'top';

  utils = Utils;
  totalCount = 0;

  memes: Meme[] = [];
  loading = false;

  constructor(private memeService: MemeService,
              private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.loadMemes(0, 30);
  }

  async loadMemes(offset: number, count: number) {
    try {
      this.memes = [];
      this.loading = true;

      const memeData = await this.memeService.getMemes(this.sort, offset, count, this.communityName);

      this.loading = false;
      this.totalCount = memeData.totalCount;
      this.memes = memeData.memes;
    } catch(err) {
      this.loading = false;
      this.snackBar.open(`Failed to retrieve memes: ${err.message}`, 'Close');
    }
  }

}
