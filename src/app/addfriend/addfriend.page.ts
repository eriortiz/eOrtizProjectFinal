import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.page.html',
  styleUrls: ['./addfriend.page.scss']
})
export class AddfriendPage {
  photo: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    defineCustomElements(window);
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
