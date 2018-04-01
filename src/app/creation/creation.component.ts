import { Component, OnInit } from '@angular/core';
import 'fabric';
import {FabricComponent} from './fabric/fabric.component';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {
  get zoomVal(): number {
    return this._zoomVal;
  }
  private _zoomVal?: number;


  setZoom(value: number) {
    this._zoomVal = value;
    console.log(value);
  }

  constructor() {

  }
  ngOnInit() {

  }

}
