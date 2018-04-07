import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { QrcodeService } from '../../services/qrcode.service';

@IonicPage()
@Component({
  selector: 'page-bar-code-scanner',
  templateUrl: 'bar-code-scanner.html',
})
export class BarCodeScannerPage implements OnInit {

  qrInput: string = ""
  tokenData: object = null
  flag: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController, private qrcodeService: QrcodeService, private loadingCtrl: LoadingController) {}

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

  openScanner() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.qrInput = barcodeData.text;
      this.getUserInfo(this.qrInput)
     }).catch(err => {
         console.log('Error', err);
     });
  }

  showData() {
    this.getUserInfo(this.qrInput)
  }

  getUserInfo(qrInput) {
    let id: string = "";
    let name: string = "";
    for(var index in this.tokenData) {
      if(this.tokenData[index]["tokenId"] == qrInput) {
        this.flag = true;
        id = this.tokenData[index]["tokenId"]
        name = this.tokenData[index]["name"]
        break;
      } else {
        this.flag = false;
      }
    }

    if(this.flag) {
      let confirm = this.alertCtrl.create({
        title: 'Collector Info',
        message: 'Name: ' + name,
        buttons: [
          {
            text: 'Confirm',
            handler: () => {
              let loadingPopup = this.loadingCtrl.create({
                content: 'Loading data...'
              });
              loadingPopup.present();
              this.qrcodeService.setStatus(id).subscribe(response => {
                if(response.status == 200) {
                  let alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'Please give the item to the collector.',
                    buttons: ['OK']
                  });
                  alert.present();
                }
              },
              error => {
                if(error.status == 406) {
                  let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'This person has already collected the item.',
                    buttons: ['OK']
                  });
                  alert.present();
                }
                if(error.status == 404) {
                  let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'This token does not exist.',
                    buttons: ['OK']
                  });
                  alert.present();
                }
                loadingPopup.dismiss();
              })
            }
          }
        ]
      });
      confirm.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'This token does not exist',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
