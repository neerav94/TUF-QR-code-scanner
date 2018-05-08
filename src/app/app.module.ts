import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BarCodeScannerPage } from '../pages/bar-code-scanner/bar-code-scanner';
import { AddDataPage } from '../pages/add-data/add-data';
import { ViewDataPage } from '../pages/view-data/view-data';

import { QrcodeService } from '../services/qrcode.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BarCodeScannerPage,
    AddDataPage,
    ViewDataPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BarCodeScannerPage,
    AddDataPage,
    ViewDataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    QrcodeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
