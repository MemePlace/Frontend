import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-community-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  nameText: string;
  titleText: string;
  descriptionText: string;

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  titleFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor() { }

  ngOnInit() {
  }

  onCreateCommunity() {
    // pass nameText, titleText, and descriptionText to server
  }
}
