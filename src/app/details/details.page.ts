import { PmdService } from './../services/pmd.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController, IonList } from '@ionic/angular';
import { Post } from '../interfaces/checklists';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  @ViewChild(IonList, { static: false }) slidingList: IonList;
  photo: SafeResourceUrl;
  private postID: String;
  private slug: string;
  public post: Post;

  constructor(
    private dataService: PmdService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private alertCtrl: AlertController
  ) {
    defineCustomElements(window);
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('id');
    //console.log(this.postID);
    this.loadPost();
  }

  loadPost(): void {
    if (this.dataService.loaded) {
      this.post = this.dataService.getPost(this.slug);
    } else {
      this.dataService.load().then(() => {
        this.post = this.dataService.getPost(this.slug);
      });
    }
  }
  addItem(): void {
    this.alertCtrl
      .create({
        header: 'Add Info',
        message: 'Enter info below:',
        inputs: [{ type: 'text', name: 'name' }],
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Save',
            handler: data => {
              this.dataService.addItem(this.post.id, data);
            }
          }
        ]
      })
      .then(prompt => {
        prompt.present();
      });
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
  }
}
