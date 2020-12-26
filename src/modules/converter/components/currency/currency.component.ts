import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { ConverterService } from '../../converter.service';

@Component({
  selector: 'sur-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  loading:boolean=false;
  value:any;
  CountryData:any=[];
  CryptoCurrencyData:any=[];
  selectedOne:any=[];
  selectedTwo:any=[];
  convertedValue:any;
  /**
   * constructor
   * 
   * @param {ConverterService} converterService 
   * @param {MatSnackBar} _snackBarService 
   */
  constructor(private converterService:ConverterService, private _snackBarService:MatSnackBar) {
    this.loading = true;
    this._unsubscribeAll = new Subject();

   }
/**
 * onInit
 * 
 * Call the API to get the country Currency list and crypto currency list
 */
  ngOnInit(): void {
    this.converterService.getListCurrencies().pipe(debounceTime(500),takeUntil(this._unsubscribeAll),map((res:string)=>JSON.parse(res))).subscribe((data:any)=>{
      if(data!==0){
       
        // this.allData = data.data;
        this.CountryData = JSON.parse(data.country);
        this.CryptoCurrencyData = JSON.parse(data.crypto);

        this.selectedOne = this.CountryData.data[0];
        this.selectedTwo = this.CryptoCurrencyData.data[0];
        console.log(data);

      }
      else
      {
        this._snackBarService.open("We are currently facing some issues at backend please bear with us !",'close',{
          duration:3000,
          panelClass: ['warn']

        })
      }
    })  
  }
  /**
   * findCurrency
   * this method is triggered to call the api and get the response from backend to convert the provided currency units
   */
  findCurrency(){
    if(!this.value)
    this.convertedValue = 0;
    else{
      this.loading=true;
    const data = {
      id:this.selectedOne.id,
      amount:this.value,
      convert_id:this.selectedTwo.symbol
    }
    this.converterService.convert(data).pipe(takeUntil(this._unsubscribeAll),map((res:string)=>JSON.parse(res))).subscribe((data:any)=>{
      this.loading=false;
      if(this.value)  
      this.convertedValue = data.data.quote[this.selectedTwo.symbol].price;
      console.log('converted data',data);
    })
  }
  }
  /**
   * changeselectedone
   * triggered when the from column currency dropdown is change
   * @param {currency_data} value
   */
  changeselectedone(value){
    this.selectedOne = value.value;
    console.log(value);
  }
   /**
   * changeselectedtwo
   * triggered when the from column currency dropdown is change
   * @param {currency_data} value
   */
  changeselectedtwo(value){
    this.selectedTwo = value.value;
    console.log(value);
  }
  /**
   * swap
   * when comparison needs to be changed vice versa this method is triggered upon clickin the swap icon
   */
  swap(){
    [this.selectedOne,this.selectedTwo] =[this.selectedTwo,this.selectedOne];
    [this.CountryData,this.CryptoCurrencyData] = [this.CryptoCurrencyData,this.CountryData];
    this.findCurrency();
  }

  /**
   * ngOnDestroy
   */
  ngOnDestroy(){
    this._unsubscribeAll.next();
  }
}
