import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-bar-code-scanner',
  templateUrl: 'bar-code-scanner.html',
})
export class BarCodeScannerPage{
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController) {}

  openScanner() {
    this.barcodeScanner.scan().then(barcodeData => {
      let alert = this.alertCtrl.create({
        title: 'Barcode data',
        subTitle: barcodeData.text,
        buttons: ['OK']
      });
      alert.present();
     }).catch(err => {
         console.log('Error', err);
     });
  }
}
