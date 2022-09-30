import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { SearchResultComponent } from './search-result/search-result.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'Network', component: NetworkComponent},
  { path: 'TurboHD', component: TurboComponent},
  { path: 'Transmission', component: TransmissionComponent},
  { path: 'Mobile', component: OnboardComponent},
  { path: 'Access Control', component: AccessControlComponent},
  { path: 'Video Intercomm', component: VideoIntercomComponent},
  { path: 'Alarm', component: AlarmComponent},
  { path: 'Accessories', component: AccessoriesComponent},
  { path: 'Software', component: SoftwareComponent},
  { path: 'products/', component: ProductsComponent},
  { path: 'search', component: SearchResultComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
