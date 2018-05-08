import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { QrcodeService } from '../../services/qrcode.service';

@IonicPage()
@Component({
  selector: 'page-view-data',
  templateUrl: 'view-data.html',
})
export class ViewDataPage implements OnInit {

  tokenData: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private qrcodeService: QrcodeService) {
  }

  ngOnInit() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();
    this.qrcodeService.getToken().subscribe(data => {
      this.tokenData = data
      loadingPopup.dismiss();
    })
  }

}
