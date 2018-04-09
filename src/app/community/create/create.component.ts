import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Community, CommunityService} from '../../api/community.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-community-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  private nameTimeout;
  form: FormGroup;

  constructor(private fb: FormBuilder, private communityService: CommunityService, private snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)], [this.nameExists.bind(this)]],
      title: ['', Validators.required],
      description: '',
      sidebar: '',
      nsfw: false
    });

    console.log(this.form);
  }

  nameExists(control: FormControl) {
    clearTimeout(this.nameTimeout);

    return new Promise((resolve, reject) => {
      this.nameTimeout = setTimeout(() => {
        this.communityService.isCommunityNameAvailable(control.value).then((exists) => {
          if (exists) {
            resolve({nameExists: true});
          } else {
            resolve(null);
          }
        }).catch((err) => resolve(null));
      }, 250);
    })
  }

  onCreateCommunity() {
    // pass nameText, titleText, and descriptionText to server
    console.log(this.form.value);
    this.communityService.createCommunity(this.form.value as Community).then((community) => {
      this.snackBar.open(`Created Community ${community.name}!`, 'Close', {
        duration: 5000
      });

      // TODO: Redirect to new community
    }).catch((err) => {
      this.snackBar.open(`Creation Failed: ${err.message}`, 'Close');
    });
  }
}
