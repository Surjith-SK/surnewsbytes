import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sur-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  searchTerm:string="";
  @Output() searchValue=new EventEmitter();
  /**
   * constructor
   * @param {Router} router 
   */
  constructor(public router:Router) { }
  /**
   * ngOnInit
   */
  ngOnInit(): void {
  }
  /**
   * emit the search term
   */
  search(){
    this.searchValue.emit(this.searchTerm);
  }
}
