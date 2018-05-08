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
  tokenData: Array<Object> = null
  flag: boolean = false;
  beneficiaryName: string = ""
  resMessage: string = "";
  tokenId: string = "";

  successFlag:boolean = false;
  notFoundFlag: boolean = false;
  messageFlag: boolean = false;

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
    let name: string = "";
    this.successFlag = false;
    this.notFoundFlag = false;
    this.messageFlag = false;
    this.flag = false;
    for(var index in this.tokenData) {
      if(this.tokenData[index]["tokenId"] == qrInput) {
        this.flag = true;
        this.tokenId = this.tokenData[index]["tokenId"]
        console.log(this.tokenId)
        name = this.tokenData[index]["name"]
        break;
      } else {
        this.flag = false;
      }
    }

    if(this.flag) {
      this.beneficiaryName = name;
      this.successFlag = true;
      this.notFoundFlag = false;
    } else {
      this.notFoundFlag = true;
      this.successFlag = false;
    }
    this.qrInput = ""
  }

  submitStatus() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();
    console.log(this.tokenId)
    this.qrcodeService.setStatus(this.tokenId).subscribe(response => {
      if(response.status) {
        this.resMessage = response.message;
        this.messageFlag = true;
      }
      loadingPopup.dismiss();
    },
    error => {
      if(error.status === 406) {
        this.resMessage = "Token already tagged";
        this.messageFlag = true;
      } else {
        this.resMessage = "Error";
        this.messageFlag = true;
      }
      loadingPopup.dismiss();
    })
  }
}
