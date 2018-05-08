import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarCodeScannerPage } from '../bar-code-scanner/bar-code-scanner';
import { AddDataPage } from '../add-data/add-data';
import { ViewDataPage } from '../view-data/view-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  // function called when user clicks on Validate Token
  showScannerPage() {
    this.navCtrl.push(BarCodeScannerPage);
  }

  // function called when user clicks on Show Token
  showDataPage() {
    this.navCtrl.push(ViewDataPage);
  }

  // function called when user clicks on Add Token
  showFormPage() {
    this.navCtrl.push(AddDataPage);
  }
}
