import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HomeService } from './home.service';

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule,
    FlexLayoutModule.withConfig({ ssrObserveBreakpoints: ['xs','sm','md'] , addOrientationBps:true}),
    MaterialModule,
    Ng2SearchPipeModule
  ],
  providers:[HomeService]
})
export class HomeModule { }
