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

  constructor() { }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas', {

    });

    this.boundry = new fabric.Rect({
      width: 450,
      height: 300,
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



}
