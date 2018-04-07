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

  private url2 = 'https://www.yourtango.com/sites/default/files/styles/header_slider/public/display_list/stop%20cheating_0.jpg?itok=aO0eTi6_';
  private longMeme = 'https://img-9gag-fun.9cache.com/photo/a0KZ7rX_700bwp.webp';

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

  uploadImgUrl(url, resize: boolean) {
    this.fab.upImg(url, resize);
    console.log('yes');
  }

  constructor() {

  }
  ngOnInit() {
    this.zoomVal = 1;
    const initSize = 500;
    this.fab.initCanv(this, initSize, initSize);
    this.functs.initBar(this, [initSize, initSize]);

  }




}
