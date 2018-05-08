import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { QrcodeService } from '../../services/qrcode.service';

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {

  nameInput: string = "";
  tokenInput: string = "";

  statusFlag: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private qrcodeService: QrcodeService, private loadingCtrl: LoadingController) {
  }

  submitToken() {
    let temp = []
    let obj = {}
    obj["name"] = this.nameInput;
    obj["tokenId"] = this.tokenInput;
    temp.push(obj);
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();
    this.qrcodeService.addNewToken(temp).subscribe(data => {
      if(data.status) {
        this.statusFlag = true;
      }
    })
    loadingPopup.dismiss();
  }

}
