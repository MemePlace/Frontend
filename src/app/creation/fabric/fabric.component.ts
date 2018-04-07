import {Component} from '@angular/core';
import 'fabric';
import {Canvas} from 'fabric/fabric-impl';
import {CreationComponent} from '../creation.component';

declare let fabric;

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})

export class FabricComponent {
  private parent: CreationComponent;

  private canvas: Canvas;
  public height: number; width: number;
  private zoomVal: number; scaledHeight: number; scaledWidth: number;

  constructor() {}

  initCanv(par: CreationComponent, h: number, w: number) {
    this.height = h;
    this.width = w;
    this.zoomVal = 1;
    this.scaledHeight = h;
    this.scaledWidth = w;
    this.parent = par;
    this.canvas = new fabric.Canvas('fabric', {});
    this.setSize([h, w]);
  }


  setSize([nheight, nwidth]: [number, number]) {
    this.height = nheight;
    this.width = nwidth;
    this.scaledHeight = nheight * this.zoomVal;
    this.scaledWidth = nwidth * this.zoomVal;
    this.adjustSize([this.scaledHeight, this.scaledWidth]);
  }

// This sets the display size, zooming
  adjustSize([h, w]: [number, number]) {
    this.canvas.setHeight(h);
    this.canvas.setWidth(w);
  }



  setZoom(val) {
    this.zoomVal = val;
    this.scaledHeight = this.zoomVal * this.height;
    this.scaledWidth = this.zoomVal * this.width;
    console.log(this.scaledHeight + ' x ' + this.scaledWidth);
    this.adjustSize([this.scaledHeight, this.scaledWidth]);
    this.canvas.setZoom(this.zoomVal);
  }

  resetZoom() {
    this.setZoom(1);
  }


  upImg(targeturl: string, resize: boolean): [boolean, [number, number]] {
    const add = (obj: fabric.Object) => (this.canvas.add(obj));
    const setSize = ([height, width]: [number, number]) => (this.parent.setSize([height, width]));

// TODO: Hadle bad URL's and other failures
    fabric.util.loadImage(targeturl, function (oImg, err) {
      if (err) {
        alert('Better error handling needed');
        throw new Error('Failed Image Load');
      } else {
        const image = new fabric.Image(oImg);
        if (resize) {
          setSize([image.height, image.width]);

        } else {
          return [true, null];
        }
        add(image);
      }
    });
    return null;
  }



}
