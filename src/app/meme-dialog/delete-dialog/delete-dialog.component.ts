import { Component, OnInit } from '@angular/core';
import { MatDialogModule} from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  providers: [MatDialogModule],
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
