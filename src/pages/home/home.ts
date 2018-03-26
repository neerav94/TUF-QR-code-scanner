import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarCodeScannerPage } from '../bar-code-scanner/bar-code-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  showScannerPage() {
    this.navCtrl.push(BarCodeScannerPage);
  }
}
