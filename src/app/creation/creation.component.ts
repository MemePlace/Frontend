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



  moveZoom(slide: any) {
    this.zoomVal = slide.value;
    this.fab.setZoom(slide.value);
    console.log(slide);
  }

  resetZoom() {
    this.zoomVal = 1;
    this.fab.resetZoom();
  }


  constructor() {

  }
  ngOnInit() {
    this.fab.initCanv();
    this.zoomVal = 1;

    this.fab.addRect();
    this.fab.upImg();
  }

}
