import {Component} from '@angular/core';
import 'fabric';
import {Canvas} from 'fabric/fabric-impl';

declare let fabric;

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})

export class FabricComponent {

  private canvas: Canvas;
  private height: number; width: number;
  private zoomVal: number; scaledHeight: number; scaledWidth: number;

  constructor() {}

  initCanv() {
    this.canvas = new fabric.Canvas('fabric', {});
    this.setSize(500, 500);
  }



  setSize(nheight: number, nwidth: number) {
    console.log('old: ' + this.height + ' x ' + this.width);
    console.log('new: ' + nheight + ' x ' + nwidth);
    this.height = nheight;
    this.width = nwidth;
    this.adjustSize(nheight, nwidth);
  }

  adjustSize(h:number, w: number) {
    this.canvas.setHeight(h);
    this.canvas.setWidth(w);
  }



  setZoom(val) {
    this.zoomVal = val;
    this.scaledHeight = this.zoomVal * this.height;
    this.scaledWidth = this.zoomVal * this.width;
    console.log(this.scaledHeight);
    this.adjustSize(this.scaledHeight, this.scaledWidth);
    this.canvas.setZoom(this.zoomVal);
  }

  resetZoom() {
    this.setZoom(1);
   // this.adjustSize(this.height, this.width);
  }




  addRect() {
    const testerShape = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red'
    });
    this.canvas.add(testerShape);
  }

  upImg(targeturl) {
    console.log(targeturl);
    const url = 'https://fthmb.tqn.com/M1ISdSdfLsU36nAuILe3YlFcY1w=/400x400/filters:fill(auto,1)/success-56a9fd1f3df78cf772abee09.jpg';
    const url2 = 'https://www.yourtango.com/sites/default/files/styles/header_slider/public/display_list/stop%20cheating_0.jpg?itok=aO0eTi6_';
    const add = (obj: fabric.Object) => (this.canvas.add(obj));
    const setSize = (height: number, width: number) => (this.setSize(height, width));

    fabric.Image.fromURL(url2, function(oImg) {
      add(oImg);
      setSize(oImg.height, oImg.width);
    });
  }


  onInputChange(event: any) {
    this.setZ(event.value);
  }


}
