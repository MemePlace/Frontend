import {Component, OnInit, ViewChild } from '@angular/core';
import 'fabric';
import {FabricComponent} from './fabric/fabric.component';
import {FunctionBarComponent} from './function-bar/function-bar.component';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {
  @ViewChild('functs') functs;
  @ViewChild('fab') fab;

  private zoomVal: number;

  private sampleUrls = [
    'https://i.redd.it/kbg27ld6l9q01.jpg',
    'https://www.yourtango.com/sites/default/files/styles/header_slider/public/display_list/stop%20cheating_0.jpg?itok=aO0eTi6_',
    'https://img-9gag-fun.9cache.com/photo/a0KZ7rX_700bwp.webp',
    'https://fthmb.tqn.com/M1ISdSdfLsU36nAuILe3YlFcY1w=/400x400/filters:fill(auto,1)/success-56a9fd1f3df78cf772abee09.jpg',
    'data:image/png;base64,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'
  ];
  private gifUrl = 'https://media.giphy.com/media/YWf50NNii3r4k/giphy.gif';


  setSize([h, w]: [number, number]) {
    this.fab.setSize([h, w]);
    this.functs.setSize([h, w]);
  }

  moveZoom(slide: any) {
    this.zoomVal = slide.value;
    this.fab.setZoom(slide.value);
  }

  resetZoom() {
    this.zoomVal = 1;
    this.fab.resetZoom();
  }

  uploadFile(file, resize: boolean) {

    this.fab.uploadFile(file, resize);
  }

  uploadImgUrl(url, resize: boolean) {
    console.log(url);

    if (url === '') {
      this.fab.upImg(this.sampleUrls[Math.floor(Math.random() * this.sampleUrls.length)], resize);
    } else {
      this.fab.upImg(url, resize);
    }
  }

  delete() {
    this.fab.delete();
  }

  addTxt(b: boolean, i: boolean, u: boolean, font: string) {
    this.fab.addTxt(b, i, u, font);
  }

  clear() {
    this.fab.clearCanvas();
  }

  moveObj(to: number) {
    if (to === 2) {
      this.fab.moveFront();
    } else if (to === 1) {
      this.fab.moveForward();
    } else if (to === -1) {
      this.fab.moveBackward();
    } else if (to === -2) {
      this.fab.moveBottom();
    }
  }

  viewAllObjs() {
    return this.fab.getObjects();
  }

  selectAll() {
    this.fab.selectAll();
  }

  download() {
    this.fab.download();
  }

  constructor() {
    const paste = (file) => (this.fab.uploadFile(file, true));
    window.addEventListener('paste', function(e: ClipboardEvent) {
      paste(e.clipboardData.files[0]);
    });

    const myDel = () => (this.delete());
    document.addEventListener('keypress', function(e: KeyboardEvent) {
      if (document.activeElement.id === 'canvCont' && e.key === 'Delete') {
        myDel();
      }
    });
  }


  ngOnInit() {
    this.zoomVal = 1;
    const initSize = 500;
    this.fab.initCanv(this, initSize, initSize);
    this.functs.initBar(this, [initSize, initSize]);
  }


  debug1() {
    this.fab.addText();
  }

  debug2() {
    const objs = this.fab.canvas.getObjects();
    console.log(objs);
  }

  debug3() {
    this.fab.clear();
  }

  debug4() {
    console.log(this.fab.canvas.getActiveObject());
  }

}
