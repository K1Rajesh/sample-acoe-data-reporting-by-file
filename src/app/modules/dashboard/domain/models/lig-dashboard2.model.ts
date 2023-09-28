import { Injectable } from "@angular/core";
import {FormControl} from '@angular/forms';

import { Observable , Subscription, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { LigDataService } from './../../services/lig-data.service';

import  { LigDashboardDataModel, LigDashboardTableViewHeaders } from '../../models/lig-dashboard-data.model'
import { FilterIModel } from './../../models/api/lig-data-reponse.model';



@Injectable()
export class LigDashboardModel2 {
    public ligDataSource : Array<LigDashboardDataModel> | undefined = undefined;
    public currentPageDataSource : Array<LigDashboardDataModel> | undefined = undefined;
    
    public headerColumns : Array<string>;
  
    public noOfRowPerPage: number = 100;
    public paginationMinIndex : number = 1;
    public paginationMaxIndex : number = 1;
    private subsList : Array<Subscription> = new Array<Subscription>();
    public pageNumberList : Array<number | string> = new Array<number | string>();
    public snippetPageNumberList : Array<number | string> = new Array<number | string>();
    public currentPageNumber : number = 1;
    public isShowTableLoader: boolean = false;

    public ligDataServiceLigData$ : Observable<Array<LigDashboardDataModel>> | undefined = undefined;
    

    constructor(private ligDataService:LigDataService) {
        this.headerColumns  = LigDashboardTableViewHeaders
    }
    init(){

    }
    public getSourceDataclickHandler(): void {
        this.initateGetLigDataCall();
        this.subscribeGetLigDataCall(); 
    }

    public initateGetLigDataCall(payLoad?:{user_persona:string}){
        this.ligDataServiceLigData$ = this.ligDataService.getLigData(payLoad);

    }
    private subscribeGetLigDataCall(){
        this.subsList.push(
            this.ligDataServiceLigData$!
            .subscribe(
              (ligData : any) =>{
                if(ligData){
                  if( ligData.data){
                    //console.log(ligData);
                    this.initDataSource(ligData.data)
                  }       
                }
              }, 
              (err:any) =>{console.log("getLigData API Error: ",err)} 
            )
          )    
    }
    public initDataSource(ligData : Array<LigDashboardDataModel>){
        this.ligDataSource = ligData

        //pagination
        this.paginationMaxIndex = this.noOfRowPerPage ? Math.floor(ligData.length / this.noOfRowPerPage) : 1;
        this.setPageNumberList()
        this.setSnippetPageNumberList();
        this.setCurrentPageDataSource();
    }

    public setPageNumberList():void{
        for(let i = this.paginationMinIndex ; i <= this.paginationMaxIndex; i++){
          this.pageNumberList.push(i)
        }
        
    }
    public setSnippetPageNumberList():void{
        if(this.currentPageNumber && this.currentPageNumber < 5){
          this.snippetPageNumberList = [2,3,4,5,'...'];
        }else if(this.currentPageNumber >=5 && this.currentPageNumber < this.paginationMaxIndex - 5){
          this.snippetPageNumberList = ['..',this.currentPageNumber-2,this.currentPageNumber-1,
          this.currentPageNumber,this.currentPageNumber+1,this.currentPageNumber+2,'..']
        }
        else if(this.currentPageNumber >= this.paginationMaxIndex - 5){
          this.snippetPageNumberList = ['..',this.paginationMaxIndex-4,this.paginationMaxIndex-3,
          this.paginationMaxIndex-2,this.paginationMaxIndex-1]
        }
        
    }
    public pageSelectHandler(pageSelectedNumberVal:string | number):void{
        //const pageSelectedValue = (event.target as HTMLInputElement).value
        
        const pageSelectedNumber = parseInt(''+pageSelectedNumberVal);
        if(pageSelectedNumber && pageSelectedNumber!== this.currentPageNumber){ // When ever we select a  valid page number
          this.currentPageNumber = pageSelectedNumber; //  set the currentPageNumber to the new value
          this.setSnippetPageNumberList();    //the snippet of pagination numbers shown will be updated
          this.setCurrentPageDataSource();   // curret page data also 
        }
    }
    public setCurrentPageDataSource():void{
        const startSliceIndex = (this.currentPageNumber - 1)*100;
        const endSliceIndex = ((this.currentPageNumber - 1)*100)+ this.noOfRowPerPage;
        this.currentPageDataSource = this.ligDataSource?.slice( startSliceIndex,  endSliceIndex)
        console.log(this.currentPageDataSource)
    }
    public dataManipulationSort(field:string, sortOrder:string):void{
        this.isShowTableLoader = true;
        setTimeout(()=>{this.sort(field,sortOrder)},0);  
    }
    public sort(field:string, sortOrder:string):void{      
        this.ligDataSource?.sort((obj_1:LigDashboardDataModel,obj_2:LigDashboardDataModel)=>{
                if(typeof obj_1[field] === "string"){
                  //const obj_1_field = String(obj_1[field]).trim()?.toLocaleLowerCase()
                  //const obj_2_field = String(obj_2[field]).trim()?.toLocaleLowerCase()
                    if(
                      (String(obj_1[field]).trim()?.toLocaleLowerCase() > String(obj_2[field]).trim()?.toLocaleLowerCase())
                    ){
                        return sortOrder==="desc" ?  -1 : 1
                    }
                    else if(
                      (String(obj_1[field]).trim()?.toLocaleLowerCase() < String(obj_2[field]).trim()?.toLocaleLowerCase())
                    ){
                        return sortOrder==="desc" ? 1 : -1
                    }
                  return 0
                }
                else{
                  return 0
                }
            
        })

        this.dataManipulationCompleted();
    }
    public dataManipulationCompleted():void{
        //After the data manipulation is completed
        this.pageSelectHandler(this.currentPageNumber); // re-select the current page number
        this.isShowTableLoader = false;  // set the data manipulation loader to false
    }         
    public destroy():void{
        this.subsList.forEach((sub)=>sub.unsubscribe())
    }
}
