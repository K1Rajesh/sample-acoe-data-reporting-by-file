import { Component, OnDestroy, OnInit  } from '@angular/core';
import { LigDataService } from 'src/app/services/lig-data.service';
import  { LigDashboardDataModel, LigDashboardDataModelHeaders, SampleLigDashboardSnippetData } from '../../models/lig-dashboard-data.model'

@Component({
  selector: 'app-lig-dashboard',
  templateUrl: './lig-dashboard.component.html',
  styleUrls: ['./lig-dashboard.component.css']
})
export class LigDashboardComponent implements OnInit , OnDestroy {

  public ligDataSource : Array<LigDashboardDataModel> | undefined = undefined;
  private _headerColumns : Array<string>;

  public noOfRowPerPage: number = 0;
  public paginationCount : number = 0;

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
  }
  public initDataSouce(ligData : Array<LigDashboardDataModel>){
    this.ligDataSource = ligData
    this.paginationCount = this.noOfRowPerPage ? ligData.length / this.noOfRowPerPage : 0;
  }

  public ngOnDestroy(): void {
    
  }

}
