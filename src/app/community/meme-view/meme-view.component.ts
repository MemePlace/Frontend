import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Self} from '@angular/core';
import {Meme, MemeService} from '../../api/meme.service';
import {Utils} from '../../utils';
import {MatSnackBar, PageEvent} from '@angular/material';
import {SidebarService} from '../../api/sidebar.service';
import {Subscription} from 'rxjs/Subscription';

export interface MemeDimensions {
  width: number;
  height: number;
}

@Component({
  selector: 'app-meme-view',
  templateUrl: './meme-view.component.html',
  styleUrls: ['./meme-view.component.scss']
})
export class MemeViewComponent implements OnInit, OnDestroy {
  @Input() communityName: string;
  @Input() sort = 'top';

  sideBarOpenSubscription: Subscription;
  utils = Utils;
  totalCount = 0;
  pageSize = 30;

  memes: Meme[] = [];
  computedDimensions: Meme[] = [];
  maxRowHeight = 300;

  loading = false;

  constructor(@Self() private el: ElementRef,
              private memeService: MemeService,
              private sidebarService: SidebarService,
              private snackBar: MatSnackBar) { }

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    if (this.memes.length > 0) {
      this.displayMemes(this.memes);
    }
  }

  async ngOnInit() {
    this.sideBarOpenSubscription = this.sidebarService.sideBarOpen$.subscribe((sidebarOpen) => {
      setTimeout(() => {
        if (this.memes.length > 0) {
          this.displayMemes(this.memes);
        }
      }, 250);
    });

    this.loadMemes(0, this.pageSize);
  }

  ngOnDestroy() {
    this.sideBarOpenSubscription.unsubscribe();
  }

  async loadMemes(offset: number, count: number) {
    try {
      this.memes = [];
      this.loading = true;

      const memeData = await this.memeService.getMemes(this.sort, offset, count, this.communityName);

      this.loading = false;
      this.totalCount = memeData.totalCount;
      this.memes = memeData.memes;
      this.displayMemes(this.memes);
    } catch (err) {
      this.loading = false;
      this.snackBar.open(`Failed to retrieve memes: ${err.message}`, 'Close');
    }
  }

  displayMemes(memes) {
    this.computedDimensions = [];
    const mMemes = memes.slice();
    let row = [];

    while (mMemes.length > 0) {
      const meme = mMemes.shift();
      row.push(meme);

      // Width with some leeway for the image margins and padding
      const rowHeight = this.getRowHeight(row, this.el.nativeElement.offsetWidth - row.length * 20);

      if (rowHeight < this.maxRowHeight) {
        this.computedDimensions.push(...this.computeImageHeights(row, rowHeight));
        row = [];
      }
    }

    // add remaining items in row at
    if (row.length > 0) {
      const rowHeight = Math.min(this.getRowHeight(row, this.el.nativeElement.offsetWidth - row.length * 20), this.maxRowHeight);
      this.computedDimensions.push(...this.computeImageHeights(row, rowHeight));
    }
  }

  getRowHeight(row, width): number {
    const height = row.reduce((acc, val) => {
      acc += val.Image.width / val.Image.height;
      return acc;
    }, 0);

    return width / height;
  }

  computeImageHeights(row, height) {
    return row.map((meme) => {
      return {
        width: height * (meme.Image.width / meme.Image.height),
        height
      };
    });
  }

  onPaginate(event: PageEvent) {
      this.loadMemes(event.pageIndex * event.pageSize, event.pageSize);
  }
}
