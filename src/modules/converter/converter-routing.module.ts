import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyComponent } from './components/currency/currency.component';

const routes: Routes = [
  {
    path:'',
    component:CurrencyComponent,
    data:{
      title:"Surjith Cryptocurrency Tracker | Currency Converter Page",
      keywords:"keywords related to Cryptocurrency Tracker",
      description:"Cryptocurrency Tracker is an application that is built as an assignment for the company named NewsBytes for the role of Frontend developer. And this is the home page for the same.",
      image:"image url",
      url:"https://domain.com"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConverterRoutingModule { }
