import { Storage } from '@ionic/storage';
import { PmdService } from './../services/pmd.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController, IonList, NavController } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss']
})
export class FriendsPage implements OnInit {
  @ViewChild(IonList, { static: false }) slidingList: IonList;

  constructor(
    public dataService: PmdService,
    private alertCtrl: AlertController,

    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  addPost(): void {
    this.alertCtrl
      .create({
        header: 'New Friend',
        message: 'Enter the name for the new Friend',
        inputs: [
          {
            type: 'text',
            name: 'name'
          }
        ],
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Save',
            handler: data => {
              this.dataService.createPost(data);
            }
          }
        ]
      })
      .then(prompt => {
        prompt.present();
      });
  }
}
