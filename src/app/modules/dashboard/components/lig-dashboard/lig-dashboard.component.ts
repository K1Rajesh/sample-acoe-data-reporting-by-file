import { Component, OnDestroy, OnInit  } from '@angular/core';
import  { LigDashboardDataModel } from '../../models/lig-dashboard-data.model'
import { LigDashboardModel } from '../../domain/models/lig-dashboard.model'
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-lig-dashboard',
  templateUrl: './lig-dashboard.component.html',
  styleUrls: ['./lig-dashboard.component.css'],
  providers: [LigDashboardModel]
})
export class LigDashboardComponent implements OnInit , OnDestroy {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> = new Observable<string[]>();
  constructor(private ligDashboardModel : LigDashboardModel) {
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
  ngOnInit(): void {
    this.ligDashboardModel.init();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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
