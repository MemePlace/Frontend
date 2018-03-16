import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-community-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

}
