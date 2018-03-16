import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-community-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  nameText = "";
  titleText = "";
  descriptionText ="";
  str = '';

  constructor() { }

  ngOnInit() {
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  titleFormControl = new FormControl('', [
    Validators.required,
  ]);

  onCreateCommunity(){
    let communityName = this.nameText;
    let communityTitle = this.titleText;
    let communityDescription = this.descriptionText;

    // send the above variables to server
  }
}
