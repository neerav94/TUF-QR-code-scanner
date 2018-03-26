import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarCodeScannerPage } from './bar-code-scanner';

@NgModule({
  declarations: [
    BarCodeScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(BarCodeScannerPage),
  ],
})
export class BarCodeScannerPageModule {}
