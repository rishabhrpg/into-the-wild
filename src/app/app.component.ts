import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { FirebaseConfig } from './interfaces/firebase-config';
import firebase from 'firebase';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-chat';

  public form: FormGroup;
  public messages: any[] = [];

  private config: FirebaseConfig = {
    apiKey: environment.apiKey,
    databaseUrl: environment.databaseUrl,
    projectId: environment.projectId
  };

  constructor() {
    firebase.initializeApp(this.config);
  }

  ngOnInit(): void {
    this.setupForm();
    this.fetchMessages();
  }

  private setupForm(): void {
    this.form = new FormGroup({
      message: new FormControl('')
    });
  }

  public sendMessage(): void {
    this.form.disable();
    const messages = firebase.database().ref('messages/');
    messages.push(this.form.getRawValue()).then(value => {
      this.form.reset();
      this.form.enable();
    }).catch((e) => {
      this.form.enable();
    });
  }

  public fetchMessages(): void {
    firebase.database().ref('messages/').on('value', resp => {
      this.messages = [];
      this.messages = this.snapshotToArray(resp);
    });
  }

  protected snapshotToArray = (snapshot: any) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };
}
