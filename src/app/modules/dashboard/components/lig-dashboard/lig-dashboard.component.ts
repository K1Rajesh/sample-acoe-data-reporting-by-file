import { Component, OnDestroy, OnInit  } from '@angular/core';

import  { LigDashboardDataModel } from '../../models/lig-dashboard-data.model'

import { LigDashboardModel2 } from '../../domain/models/lig-dashboard2.model'


@Component({
  selector: 'app-lig-dashboard',
  templateUrl: './lig-dashboard.component.html',
  styleUrls: ['./lig-dashboard.component.css'],
  providers: [LigDashboardModel2]
})
export class LigDashboardComponent implements OnInit , OnDestroy {

  constructor(private ligDashboardModel : LigDashboardModel2) {
  }
  get headerColumns(): Array<string> {
    return  this.ligDashboardModel.headerColumns;
  }
  get paginationMinIndex():number{
    return  this.ligDashboardModel.paginationMinIndex;
  }
  get paginationMaxIndex():number{
    return  this.ligDashboardModel.paginationMaxIndex;
  }
  get currentPageNumber():number{
    return  this.ligDashboardModel.currentPageNumber;
  }
  get snippetPageNumberList():Array<number | string>{
    return  this.ligDashboardModel.snippetPageNumberList;
  }
  
  get currentPageDataSource() : Array<LigDashboardDataModel> | undefined {
    return this.ligDashboardModel.currentPageDataSource
  }
  get isShowTableLoader():boolean{
    return this.ligDashboardModel.isShowTableLoader
  }
  get filters():any{
    return this.ligDashboardModel.filters;
  }
  ngOnInit(): void {
    this.ligDashboardModel.init();
  }
  public getSourceDataclickHandler(): void {
    this.ligDashboardModel.getSourceDataclickHandler();
  }

  public pageSelectHandler(pageSelectedNumberVal:string | number):void{
    this.ligDashboardModel.pageSelectHandler(pageSelectedNumberVal)
  }
  public sort(field:string, sortOrder:string){
    this.ligDashboardModel.dataManipulationSort(field, sortOrder)
  }
 
  public ngOnDestroy(): void {
    this.ligDashboardModel.destroy();
  }

}
