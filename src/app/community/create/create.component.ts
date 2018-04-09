import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommunityService} from '../../api/community.service';

@Component({
  selector: 'app-community-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  private nameTimeout;
  form: FormGroup;

  constructor(private fb: FormBuilder, private communityService: CommunityService) {
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
  }
}
