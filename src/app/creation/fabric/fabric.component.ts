import { Component, OnInit } from '@angular/core';
import 'fabric';

declare let fabric;

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})

export class FabricComponent implements OnInit {
  private canvas;
  private boundry;
  private testshape;
  private slideval = 1;
  public zoomVal = 1;
  private height = 450;
  private width = 375;
  private scaledHeight;
  private scaledWidth;

  constructor() {}

  setZ(val) {
    this.zoomVal = val;
    this.scaledHeight = this.zoomVal * this.height;
    this.scaledWidth = this.zoomVal * this.width;
    this.canvas.setHeight(this.scaledHeight);
    this.canvas.setWidth(this.scaledWidth);
    this.canvas.setZoom(this.zoomVal);
  }


  ngOnInit() {

    this.canvas = new fabric.Canvas('canvas', {

    });

    this.boundry = new fabric.Rect({
      height: 400,
      width: 325,
      fill: 'transparent',
      stroke: '#666',
      strokeDashArray: [5, 5]
    });

    this.testshape = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red'
    });

    this.canvas.add(this.boundry);
    this.canvas.add(this.testshape);

    this.canvas.centerObject(this.boundry);
  }

  onInputChange(event: any) {
    this.setZ(event.value);
  }


}
