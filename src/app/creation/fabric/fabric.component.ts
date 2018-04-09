import {Component, ViewChild} from '@angular/core';
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

  constructor() { }

  initCanv(par: CreationComponent, h: number, w: number) {
    this.height = h;
    this.width = w;
    this.zoomVal = 1;
    this.scaledHeight = h;
    this.scaledWidth = w;
    this.parent = par;
    this.canvas = new fabric.Canvas('fabric', {
      preserveObjectStacking: true
    });

    this.setSize([h, w]);

    this.canvas.on('selection:created', function(e) {
      console.log('created event happened: ' + e);
    });

    this.canvas.on('selection:updated', function(e) {
      console.log('update event happened: ' + e);
    });

    this.canvas.on('selection:cleared', function(e) {
      console.log('cleared event happened: ' + e);
    });
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

  moveFront() {
    this.canvas.bringToFront(this.canvas.getActiveObject());
  }

  moveForward() {
    this.canvas.bringForward(this.canvas.getActiveObject());
  }

  moveBackward() {
    this.canvas.sendBackwards(this.canvas.getActiveObject());
  }

  moveBottom() {
    this.canvas.sendToBack(this.canvas.getActiveObject());
  }


  upImg(targeturl: string, resize: boolean) {
    const add = (obj: fabric.Object) => (this.canvas.add(obj));
    const setSize = ([height, width]: [number, number]) => (this.parent.setSize([height, width]));
// TODO: Hadle bad URL's and other failures
    fabric.util.loadImage(targeturl, function (oImg, err) {
      if (err) {
        alert('Better error handling needed');
        throw new Error('Failed Image Load');
      } else {
        console.log('not an err');
        const image = new fabric.Image(oImg);
        if (resize) {
          setSize([image.height, image.width]);
        }
        add(image);
      }
    });
  }

  addTxt() {
    const fabTxt = new fabric.IText('New Text');
    this.canvas.add(fabTxt);
    this.canvas.centerObject(fabTxt);
  }

  delete() {
    let obj: fabric.Object;
    obj = this.canvas.getActiveObject();
    if (obj) {
      this.canvas.remove(obj);
    }
  }

  clearCanvas() {
    this.canvas.clear();
  }

  keyHit(e) {
    console.log('key: hit');
  }
}
