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
  @ViewChild('fontOption') fontOption;
  private parent: CreationComponent;
  public sHeight: number;
  public sWidth: number;
  public resizeCheck: boolean;
  public aspectIcon: string;
  public arToggle: boolean;
  public aspectRatio: number;
  public fontSize: number;
  public selected = 'Impact';
  public fontColour; // TODO: Implement font color UI

  // TODO: Not all fonts are loaded into FabricJS immediately, pre-loading is needed
  public fonts: Array<any> = [
    { name: 'Impact' },
    { name: 'Arial' },
    { name: 'Pacifico' },
    { name: 'Roboto' },
    { name: 'Lora' },
    { name: 'Croissant One' },
    { name: 'Architects Daughter' },
    { name: 'Emblema One' },
    { name: 'Graduate' },
    { name: 'Hammersmith One' },
    { name: 'Oswald' },
    { name: 'Oxygen' },
    { name: 'Krona One' },
    { name: 'Indie Flower' },
    { name: 'Courgette' },
    { name: 'Gruppo' },
    { name: 'Ranchers' }
    ];


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

  addTxt(bold: boolean, italic: boolean, underline: boolean, font: string, size: number) {
    this.parent.addTxt(bold, italic, underline, font, size);
  }

  moveObj(val: number) {
    this.parent.moveObj(val);
  }

  viewAll() {
    console.log(this.parent.viewAllObjs());
  }

  selectAll() {
    this.parent.selectAll();
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

  toggleAspectRatio() {
    if (this.arToggle) {
      this.arToggle = false;
      this.aspectIcon = 'lock_open';
    } else {
      this.arToggle = true;
      this.aspectIcon = 'lock';
      this.aspectRatio = this.sHeight / this.sWidth;
      console.log(this.aspectRatio);
    }
  }

  checkAR(axis: string, value: number) {
    if (axis === 'h' && this.arToggle === true) {
      this.sHeight = value;
      this.sWidth = this.sHeight / this.aspectRatio;
    } else if (axis === 'w' && this.arToggle === true) {
      this.sWidth = value;
      this.sHeight = this.sWidth * this.aspectRatio;
    }
  }


  initBar(par: CreationComponent, size: [number, number]): void {
    this.arToggle = false;
    this.aspectIcon = 'lock_open';
    this.fontSize = 72;
    this.resizeCheck = true;
    this.parent = par;
    this.setSize(size);
  }

}
