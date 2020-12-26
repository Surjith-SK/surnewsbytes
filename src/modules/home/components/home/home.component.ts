import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { HomeService } from '../../home.service';

@Component({
  selector: 'sur-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  allData:any=[];
  idsData:any=[];
  listData:any=[];
  searchValue:string="";
  pageSize:number=8;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading:boolean=false;
  startIndex:number=0;
  endIndex:number=0;
  disabled:boolean=false;
  /**
   * constructor
   * 
   * @param {HomeService} homeService 
   * @param {MatSnackBar} _snackBarService 
   */
  constructor(
    private homeService: HomeService,
    private _snackBarService: MatSnackBar
  ) {
    this.loading = true;
    this._unsubscribeAll = new Subject();
   
   }
/**
 * onInit
 */
  ngOnInit(): void {
    
    this.homeService.getList().pipe(takeUntil(this._unsubscribeAll),map((res:string)=>JSON.parse(res))).subscribe((data:any) => {
      if(data!==0){
       
      this.allData = JSON.parse(data.all);
      this._snackBarService.open("Found "+ this.allData.data.length+" results for your query",'close',{
        duration:3000,
        panelClass: ['success']
  
      })
      this.idsData = JSON.parse(data.ids);
      this.listData = this.allData.data.slice(0,8);
      this.loading = false;

      console.log(this.allData)
      console.log(this.idsData)
      }
      else{
        this._snackBarService.open("We are currently facing some issues at backend please bear with us !",'close',{
          duration:3000,
          panelClass: ['warn']

        })
      }


    });
  }
  /**
   * searchTerm
   * filter in the list to show the searched terms based on name
   * @param {string} value 
   */
  searchTerm(value){
    if (!this.listData) {
      this.listData = [];
      this.disabled=false
      return;
    }
    if (!value) {
     this.listData = this.allData.data.slice(0,this.pageSize);
     this.disabled=false
    return;
    }
    value = value.toLocaleLowerCase();
    this.disabled = true;
    this.listData =  this.allData.data.filter(it => {
      return it.name.toLocaleLowerCase().includes(value) ;
    });
    this.searchValue = value;
  }
  /**
   * OnPageChange
   * upon click next or previous this method is triggered
   * @param {PageEvent} event 
   */
  OnPageChange(event:PageEvent){
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.allData.data.length){
      this.endIndex = this.allData.data.length;
    }
    this.listData = this.allData.data.slice(this.startIndex, this.endIndex);
  }
  
  /**
   * 
   */
  ngOnDestroy(){
    this._unsubscribeAll.next();
  }


}
