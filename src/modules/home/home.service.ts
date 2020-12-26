import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {globalHelpers} from 'src/app/global/global';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http:HttpClient) { 
  
  }

  getList() {
    return this.http.get(globalHelpers.apiUrl+"newsBytes/GetList");
  }

}
