import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalHelpers } from 'src/app/global/global';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  constructor(private http:HttpClient) { 
  
  }

  getListCurrencies() {
    return this.http.get(globalHelpers.apiUrl+"newsBytes/GetCurrencies");
  }

  convert(data){
    return this.http.post(globalHelpers.apiUrl+'newsBytes',data);
  }
}
