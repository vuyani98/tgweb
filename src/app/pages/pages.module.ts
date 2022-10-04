import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesRoutingModule } from './pages-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NetworkComponent } from './Products/network/network.component';
import { TurboComponent } from './Products/turbo/turbo.component';
import { TransmissionComponent } from './Products/transmission/transmission.component';
import { OnboardComponent } from './Products/onboard/onboard.component';
import { AccessControlComponent } from './Products/access-control/access-control.component';
import { VideoIntercomComponent } from './Products/video-intercom/video-intercom.component';
import { AlarmComponent } from './Products/alarm/alarm.component';
import { AccessoriesComponent } from './Products/accessories/accessories.component';
import { SoftwareComponent } from './Products/software/software.component';
import { ProductsComponent } from './Products/products/products.component';
import { ColovuComponent } from './colovu/colovu.component';
import { AcusenseComponent } from './acusense/acusense.component';
import { AxproComponent } from './axpro/axpro.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';


@NgModule({
  declarations: [
    LandingPageComponent,
    NetworkComponent,
    TurboComponent,
    TransmissionComponent,
    OnboardComponent,
    AccessControlComponent,
    VideoIntercomComponent,
    AlarmComponent,
    AccessoriesComponent,
    SoftwareComponent,
    ProductsComponent,
    ColovuComponent,
    AcusenseComponent,
    AxproComponent,
    SearchResultComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    IvyCarouselModule
  ]
})
export class PagesModule { }
