import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CreationComponent} from '../creation.component';
import {FunctionBarComponent} from '../function-bar/function-bar.component';
import {ImgurService} from '../imgur.service';
import {MatSnackBar} from '@angular/material';
import {MemeService} from '../../api/meme.service';
import {UserService} from '../../api/user.service';
import {ResizeEvent} from 'angular-resizable-element';
import {StorageService, StorageType} from '../../api/storage.service';

import * as FontFaceObserver from 'fontfaceobserver';
import 'fabric';

declare let fabric;

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})

export class FabricComponent implements OnDestroy {
  @ViewChild('canvCont') canvCont;
  private parent: CreationComponent;

  private canvas;
  private functComp: FunctionBarComponent;
  public height: number;
  public width: number;
  public zoomVal: number;
  public scaledHeight: number;
  public scaledWidth: number;

  private preResize = {width: 0, height: 0};
  private oldEdges: {top: number, right: number, bottom: number, left: number};

  private history = [];
  private loadingCanvas = false;
  private historyPointer = -1;

  constructor(private imgurService: ImgurService,
              private memeService: MemeService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private storageService: StorageService) { }

  initCanv(par: CreationComponent, funct: FunctionBarComponent, h: number, w: number) {
    this.height = h;
    this.width = w;
    this.zoomVal = 1;
    this.scaledHeight = h;
    this.scaledWidth = w;
    this.parent = par;
    this.functComp = funct;

    this.canvas = new fabric.Canvas('fabric', {
      backgroundColor: 'white',
      preserveObjectStacking: true
    });

    const savedState = this.storageService.getJSON(StorageType.local, 'canvas_state');

    if (savedState) {
      this.loadCanvasJSON(savedState);
    }

    this.save();

    this.canvas.on('object:modified', this.save.bind(this));
    this.canvas.on('object:added', this.save.bind(this));
    this.canvas.on('object:removed', this.save.bind(this));

    this.setSize(h, w);
  }

  ngOnDestroy() {
    if (this.canvas.getObjects().length === 0) {
      this.storageService.remove(StorageType.local, 'canvas_state');
    } else {
      this.storageService.setJSON(StorageType.local, 'canvas_state', this.toJSON());
    }
  }

  /**
   * Wrapper around save to ensure the canvas has done the pending operations before saving
   */
  save() {
    setTimeout(() => {
      this._save();
    }, 0);
  }

  private _save() {
    if (this.loadingCanvas) {
      return;
    }

    if (this.history.length >= this.historyPointer + 2) {
      // destroy any history after this
      this.history = this.history.slice(0, this.historyPointer + 1);
      this.historyPointer = this.history.length - 1;
    }

    this.history.push(this.toJSON());
    this.historyPointer++;
  }

  toJSON() {
    return this.canvas.toJSON(['width', 'height', 'viewportTransform']);
  }

  undo() {
    if (this.historyPointer > 0) {
      this.historyPointer--;
      this.loadCanvasJSON(this.history[this.historyPointer]);
    }
  }

  redo() {
    if (this.history.length > this.historyPointer + 1) {
      this.historyPointer += 1;
      this.loadCanvasJSON(this.history[this.historyPointer]);
    }
  }

  loadCanvasJSON(data) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    this.loadingCanvas = true;
    this.canvas.loadFromJSON(data, () => {
      // set the width and height
      this.zoomVal = data.viewportTransform[0];
      this.setSize(data.height / this.zoomVal, data.width / this.zoomVal);

      this.canvas.absolutePan({x: -data.viewportTransform[4], y: -data.viewportTransform[5]});
      this.canvas.renderAll();

      setTimeout(() => {
        this.loadingCanvas = false;
      }, 1);
    });
  }

  resizeStart() {
    this.preResize.width = this.scaledWidth;
    this.preResize.height = this.scaledHeight;
    this.oldEdges = {top: 0, right: 0, bottom: 0, left: 0};
  }

  resizeEnd() {
    this.save();
  }

  onResize(event: ResizeEvent) {
    let height = this.preResize.height;
    const pan = {x: 0, y: 0};

    if (event.edges.top) {
      pan.y = -(event.edges.top as number - this.oldEdges.top);
      height += -event.edges.top;
    } else if (event.edges.bottom) {
      height += event.edges.bottom as number;
    }

    let width = this.preResize.width;
    if (event.edges.right) {
      width += event.edges.right as number;
    } else if (event.edges.left) {
      pan.x = -(event.edges.left as number - this.oldEdges.left);
      width += -event.edges.left;
    }

    // We have to pan the opposite way if the user is adjusting the top or left handles
    this.canvas.relativePan(pan);

    // Set the height, but we have to pass the new original height without the zoom
    // The user has to be able to adjust on the level of the scaled canvas though
    // (1 pixel affects 1 pixel of the scaled copy they see)
    this.setSize(height / this.zoomVal, width / this.zoomVal);
    this.oldEdges = Object.assign(this.oldEdges, event.edges);
  }

  setSize(nHeight: number, nWidth: number) {
    this.height = nHeight;
    this.width = nWidth;
    this.scaledHeight = nHeight * this.zoomVal;
    this.scaledWidth = nWidth * this.zoomVal;
    this.adjustSize(this.scaledHeight, this.scaledWidth);
  }

  adjustSize(h: number, w: number) {
    this.canvas.setHeight(h);
    this.canvas.setWidth(w);
  }



  setZoom(val) {
    this.zoomVal = val;
    this.scaledHeight = this.zoomVal * this.height;
    this.scaledWidth = this.zoomVal * this.width;
    this.adjustSize(this.scaledHeight, this.scaledWidth);
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

  getObjects() {
    console.log(this.canvas.getObjects());
  }

/* CREDIT TO https://github.com/michaeljcalkins/angular-fabric/blob/master/assets/fabric.js */
  download() {
    const pic = this.canvas.toDataURL({
      multiplier: 1 / this.zoomVal
    });

    const data = pic.replace('data:image/png;base64,', '');
    const blob = this.b64toBlob(data, 'image/png');

    this.canvas.discardActiveObject();
    this.resetZoom();

    const link = document.createElement('a');
    link.download = 'myCanvas.png';
    link.href = URL.createObjectURL(blob);
    link.click();
  }

  /* CREDIT TO https://github.com/michaeljcalkins/angular-fabric/blob/master/assets/fabric.js */
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }


  uploadImageFromFile(file) {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: FileReaderEvent) => {
      const imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = () => {
        this.addImageToCanvas(new fabric.Image(imgObj));
      };
    };

    reader.readAsDataURL(file);
  }

  addImageToCanvas(image: fabric.Image) {
    if (this.canvas.getObjects().length === 0) {
      // resize canvas to fit image, reset panning
      this.canvas.absolutePan({x: 0, y: 0});
      this.setSize(image.height, image.width);
    }

    this.canvas.add(image);
    (image as any).viewportCenter(); // TODO: Fabric types out of date
    image.setCoords();
  }


  uploadImageFromExternalUrl(url: string) {
    this.imgurService.uploadImg(url)
      .then((val) => this.addImageUrlToCanvas(val.link))
      .catch((err) => this.parent.err(err.toString()));
  }

  addImageUrlToCanvas(url) {
    fabric.Image.fromURL(url, (img) => {
      if (img.getElement() === undefined) {
        this.snackBar.open('Failed to obtain image from URL', 'Close');
      }

      this.addImageToCanvas(img);
    }, {crossOrigin: 'Anonymous'});
  }


  async addTxt(bold: boolean, italic: boolean, underline: boolean, font: string, size: number, align: string) {
    const fontWeight = bold ? 'bold' : 'normal';
    const fontStyle = italic ? 'italic' : 'normal';

    const f = new FontFaceObserver(font);

    try {
      await f.load();
    } catch (e) {
      this.snackBar.open(`Failed to load font ${font}`, 'Close');
    }

    const newTxt = new fabric.Textbox('New Text', {
      fontSize: size,
      fontFamily: font,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textAlign: align,
      underline: underline,
      fill: '#fff',
      stroke: '#000',
      _strokeWidth: 2,
    });

    this.canvas.add(newTxt);
    newTxt.viewportCenter().setCoords();
  }

  delete() {
    const sel = this.canvas.getActiveObjects();
    if (sel) {
      this.canvas.remove(...sel);
    }
    this.canvas.discardActiveObject().renderAll();
  }

  selectAll() {
    this.canvas.discardActiveObject();
    const selection = new fabric.ActiveSelection(this.canvas.getObjects(), {
      canvas: this.canvas
    });
    this.canvas.setActiveObject(selection).renderAll();
    console.log(this.canvCont.nativeElement);
    this.canvCont.nativeElement.focus();
  }

  clearCanvas() {
    this.canvas.clear();
    this.canvas.setBackgroundColor('white');
    this.save();
  }

  publish() {
    const communityName = this.parent.communityName;

    if (!communityName) {
      this.snackBar.open('You must pick a community to post to!', 'Close');
      return;
    }

    if (this.canvas.getObjects().length === 0) {
      this.snackBar.open('Do you really think you can publish an empty meme?', 'Close');
      return;
    }

    if (!this.userService.isLoggedIn()) {
      this.snackBar.open('You must be logged in to post your meme!', 'Close');
    }  else {
      const pic = this.canvas.toDataURL({
        multiplier: 1 / this.zoomVal
      });

      const imageData = pic.replace('data:image/png;base64,', '');
      this.imgurService.uploadImg(imageData).then((response) => {
        return this.memeService.createMeme(this.parent.title, response.link, response.width, response.height, null, communityName);
      }).then((meme) => {
        this.snackBar.open('Successfully created meme!', 'Close');
        this.parent.resetZoom();
        this.clearCanvas();
        this.parent.title = '';
        this.parent.communityName = '';
      }).catch((err) => {
        this.snackBar.open(`Failed to create meme: ${err.message}`, 'Close');
      });
    }
  }
}
