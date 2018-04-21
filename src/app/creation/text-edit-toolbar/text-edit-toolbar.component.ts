import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import * as FontFaceObserver from 'fontfaceobserver';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-text-edit-toolbar',
  templateUrl: './text-edit-toolbar.component.html',
  styleUrls: ['./text-edit-toolbar.component.scss']
})
export class TextEditToolbarComponent implements OnInit {
  @Output() textChanged = new EventEmitter();

  canvas_;
  hidden = true;

  public activeObject;

  get style() {
    return this.activeObject || {};
  }

  public fonts = [
    { name: 'Impact' },
    { name: 'Arial' },
    { name: 'Pacifico' },
    { name: 'Roboto' },
    { name: 'Lora' },
    { name: 'VT323' },
    { name: 'Quicksand' },
    { name: 'Croissant One' },
    { name: 'Architects Daughter' },
    { name: 'Emblema One' },
    { name: 'Graduate' },
    { name: 'Hammersmith One' },
    { name: 'Inconsolata' },
    { name: 'Oswald' },
    { name: 'Oxygen' },
    { name: 'Krona One' },
    { name: 'Indie Flower' },
    { name: 'Courgette' },
    { name: 'Gruppo' },
    { name: 'Ranchers' }
  ];

  @HostBinding('style.bottom.px') bottom = 0;
  @HostBinding('style.left.px') left = 0;

  @Input() set canvas(v) {
    this.canvas_ = v;
    this.bindEvents();
  }

  get canvas() {
    return this.canvas_;
  }

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  computePosition() {
    const object = this.canvas.getActiveObject();

    if (!object) {
      return;
    }

    this.bottom = this.canvas.height - object.oCoords.tl.y + 20;
    this.left = object.oCoords.mb.x;
  }

  bindEvents() {
    this.canvas.on('text:editing:entered', () => {
      this.activeObject = this.canvas.getActiveObject();
      this.computePosition();
      this.hidden = false;
    });

    this.canvas.on('text:editing:exited', () => {
      this.activeObject = null;
      this.hidden = true;
    });
  }

  center(type: 'horizontal'|'vertical'|'both') {
    if (type === 'horizontal') {
      this.activeObject.viewportCenterH().setCoords();
    } else if (type === 'vertical') {
      this.activeObject.viewportCenterV().setCoords();
    } else if (type === 'both') {
      this.activeObject.viewportCenter().setCoords();
    } else {
      throw new Error('Invalid text centering option');
    }

    this.textChanged.emit();
    this.computePosition();
  }

  setStyle(key: string, val: string) {
    this.activeObject.set(key, val);
    this.activeObject.dirty = true;

    this.textChanged.emit();

    this.canvas.renderAll();
  }

  async changeFont(font: string) {
    const f = new FontFaceObserver(font);

    try {
      await f.load();
      this.setStyle('fontFamily', font);
    } catch (e) {
      this.snackBar.open(`Failed to load font ${font}`, 'Close');
    }
  }
}
