import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {CreationComponent} from '../creation.component';


@Component({
  selector: 'app-function-bar',
  templateUrl: './function-bar.component.html',
  styleUrls: ['./function-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FunctionBarComponent {
  @ViewChild('imgURL') urlIn;
  @ViewChild('fileIn') fileIn;
  private parent: CreationComponent;
  private sHeight: number; sWidth: number;
  public resizeCheck;

  public hardCodeURL; // = 'https://fthmb.tqn.com/M1ISdSdfLsU36nAuILe3YlFcY1w=/400x400/filters:fill(auto,1)/success-56a9fd1f3df78cf772abee09.jpg';


  constructor() { }


  changeSize(val: [number, number]): void {
    this.parent.setSize(val);
  }

  setSize([newHeight, newWidth]: [number, number]): void {
    this.sHeight = newHeight;
    this.sWidth = newWidth;
  }

  uploadFile() {
    const file = this.fileIn.nativeElement.files[0];
    this.parent.uploadFile(file, this.resizeCheck);
  }

  uploadUrl(): void {
    const url = this.urlIn.nativeElement.value;
    this.parent.uploadImgUrl(url, this.resizeCheck);
  }

  addTxt(bold: boolean, italic: boolean, underline: boolean) {
    this.parent.addTxt(bold, italic, underline);
  }

  moveObj(val: number) {
    this.parent.moveObj(val);
  }

  viewAll() {
    console.log(this.parent.viewAllObjs());
  }

  download() {
    this.parent.download();
  }

  clear() {
    this.parent.clear();
  }

  toggleSize() {
    this.resizeCheck = !this.resizeCheck;
  }


  initBar(par: CreationComponent, size: [number, number]): void {
    this.resizeCheck = true;
    this.parent = par;
    this.setSize(size);
  }
}
