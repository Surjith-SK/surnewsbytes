import { NgModule } from '@angular/core';

import { ConverterRoutingModule } from './converter-routing.module';
import { CurrencyComponent } from './components/currency/currency.component';
import { ConverterService } from './converter.service';
//Material
import { MaterialModule } from '../material/material.module';
//FlexLayout
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [CurrencyComponent],
  imports: [
    ConverterRoutingModule,
    //Material
    MaterialModule,
    //FlexLayout
    FlexLayoutModule.withConfig({ ssrObserveBreakpoints: ['xs','sm','md'] , addOrientationBps:true}),

  ],
  providers:[ConverterService]
})
export class ConverterModule { }
