import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Utils} from '../utils';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  @ViewChild('main') mainRef: ElementRef;
  @ViewChild('matrix') matrixRef: ElementRef;


  private characters = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑'.split('');
  private fontSize = 10;
  private drops;

  utils = Utils;

  constructor() { }

  ngOnInit() {
    setInterval(this.draw.bind(this), 33);
  }

  draw() {
    // Inspired by http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript
    const ctx = this.matrixRef.nativeElement.getContext('2d');
    const c = this.matrixRef.nativeElement;

    // On resize recompute drops
    if (c.width !== this.mainRef.nativeElement.offsetWidth) {
      c.width = this.mainRef.nativeElement.offsetWidth;

      const columns = c.width / this.fontSize;

      this.drops = [];
      for (let x = 0; x < columns; x++) {
        this.drops[x] = 1;
      }
    }

    if (c.height !== this.mainRef.nativeElement.offsetHeight) {
      c.height = this.mainRef.nativeElement.offsetHeight;
    }

    // Translucent black background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = '#0F0';
    ctx.font = `${this.fontSize}px arial`;

    for(let i = 0; i < this.drops.length; i++)
    {
      const letter = this.characters[Math.floor(Math.random() * this.characters.length)];
      ctx.fillText(letter, i * this.fontSize, this.drops[i] * this.fontSize);

      // Randomly send drop back to top
      if(this.drops[i] * this.fontSize > c.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }
  }

}
