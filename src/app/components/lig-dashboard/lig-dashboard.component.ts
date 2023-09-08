import { Component, OnDestroy, OnInit  } from '@angular/core';
import { LigDataService } from 'src/app/services/lig-data.service';
import  { LigDashboardDataModel, LigDashboardDataModelHeaders, SampleLigDashboardSnippetData } from '../../models/lig-dashboard-data.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lig-dashboard',
  templateUrl: './lig-dashboard.component.html',
  styleUrls: ['./lig-dashboard.component.css']
})
export class LigDashboardComponent implements OnInit , OnDestroy {

  public ligDataSource : Array<LigDashboardDataModel> | undefined = undefined;
  public currentPageDataSource : Array<LigDashboardDataModel> | undefined = undefined;
  
  private _headerColumns : Array<string>;

  public noOfRowPerPage: number = 100;
  public paginationMaxIndex : number = 0;
  private subsList : Array<Subscription> = new Array<Subscription>();
  public pageNumberList : Array<number> = new Array<number>();
  public currentPageNumber : number = 1;


  constructor(private ligDataService:LigDataService) {
    this._headerColumns  = LigDashboardDataModelHeaders
   }
  get headerColumns(): Array<string> {
    return  this._headerColumns;
  }
  ngOnInit(): void {
    //this.subscribeLigData()
    //this.ligDataSource = SampleLigDashboardSnippetData
    
  }
  public clickHandler(): void {
    this.subscribeLigData(); 
  }
  private subscribeLigData(){
    this.subsList.push(
      this.ligDataService.getLigData()
      .subscribe(
        (ligData : Array<LigDashboardDataModel>) =>{
          if(ligData){
            //console.log(ligData);
            this.initDataSouce(ligData)
          }
        }, 
        (err:any) =>{console.log("getLigData API Error: ",err)} 
      )
    )
  }
  public initDataSouce(ligData : Array<LigDashboardDataModel>){
    this.ligDataSource = ligData
    this.paginationMaxIndex = this.noOfRowPerPage ? ligData.length / this.noOfRowPerPage : 0;
    this.setPageNumberList(1,this.paginationMaxIndex)
    this.setCurrentPageDataSource();

  }
  public setPageNumberList(minIndex:number, maxIndex:number):void{
    for(let i = minIndex; i <= maxIndex; i++){
      this.pageNumberList.push(i)
    }
    
  }
  public pageSelectHandler(pageNumber : number):void{
    this.currentPageNumber = pageNumber;
    this.setCurrentPageDataSource();
  }
  public setCurrentPageDataSource():void{
    const startSliceIndex = (this.currentPageNumber - 1)*100;
    const endSliceIndex = ((this.currentPageNumber - 1)*100)+ this.noOfRowPerPage;
    this.currentPageDataSource = this.ligDataSource?.slice( startSliceIndex,  endSliceIndex)
  }

  public ngOnDestroy(): void {
    this.subsList.forEach((sub)=>sub.unsubscribe())
  }

}
