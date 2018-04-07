import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CreationComponent} from '../creation.component';
import {MatCheckbox} from '@angular/material';

@Component({
  selector: 'app-function-bar',
  templateUrl: './function-bar.component.html',
  styleUrls: ['./function-bar.component.scss']
})

export class FunctionBarComponent {
  private parent: CreationComponent;
  private sHeight: number; sWidth: number;
  private resize = true;

  public hardCodeURL = 'https://fthmb.tqn.com/M1ISdSdfLsU36nAuILe3YlFcY1w=/400x400/filters:fill(auto,1)/success-56a9fd1f3df78cf772abee09.jpg';


  constructor() { }


  changeSize(val: [number, number]): void {
    this.parent.setSize(val);
  }

  setSize([newHeight, newWidth]: [number, number]): void {
    this.sHeight = newHeight;
    this.sWidth = newWidth;
  }

  uploadUrl(value: string, resize: boolean): void {
    this.parent.uploadImgUrl(value, resize);
  }


  initBar(par: CreationComponent, size: [number, number]): void {
    this.parent = par;
    this.setSize(size);
    this.resize = true;
  }

  checkBox(val) {
    this.resize = val;
  }
}
