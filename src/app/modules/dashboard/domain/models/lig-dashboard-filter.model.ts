import { Injectable } from "@angular/core";
import {FormControl} from '@angular/forms';

import { Observable , Subscription, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { LigDashboardModel2} from './lig-dashboard2.model'

import { FilterIModel } from './../../models/api/lig-data-reponse.model';
import { LigDataFilterIModel } from "../../models/api/lig-data-request.model";
import { FiterControlIModel } from "../../models/lig-dashboard-filter.model";



@Injectable()
export class LigDashboardFilterModel {

    private subsList : Array<Subscription> = new Array<Subscription>();

    public filtersUniqueValues : any;

    public filtersAvailable : Array<string> = [
      "user_persona",
      "taluka",
      "sap_cc_number",
      "SALES_GROUP_NAME",
      "SALES_OFFICE_NAME",
      "state",
      "district",
      "PRODUCT_NAME",
      "PRODUCT_CODE",
      "PRODUCT_BRAND",
    ]

    /* ------------------------ filter related propertires start --------------------- */
    public channelParnterFilterControl = new FormControl('');
    public channelParnterFilterOptionsAll: string[] = [];
    public channelParnterFilterOptionsCurrent$: Observable<string[]> = new Observable<string[]>();

    public userPersonaFilterControl = new FormControl('');
    public userPersonaFilterOptionsAll: string[] = [];
    public userPersonaFilterOptionsCurrent$: Observable<string[]> = new Observable<string[]>();

    public talukaFilterControl = new FormControl('');
    public talukaFilterOptionsAll: string[] = [];
    public talukaFilterOptionsCurrent$: Observable<string[]> = new Observable<string[]>();

    public stateFilterControl = new FormControl('');
    public stateFilterOptionsAll: string[] = [];
    public stateFilterOptionsCurrent$: Observable<string[]> = new Observable<string[]>();

    public biTerriotoaryFilterControl = new FormControl('');
    public biTerriotoaryFilterOptionsAll: string[] = [];
    public biTerriotoaryFilterOptionsCurrent$: Observable<string[]> = new Observable<string[]>();

    public filterFormControls : Map<string , FiterControlIModel> = new Map<string , FiterControlIModel>();

    /* ------------------------ filter related propertires start --------------------- */

    private filtersApplied : LigDataFilterIModel;

  
    constructor(private ligDashBoardModel2 : LigDashboardModel2) {
      this.filtersApplied = { "month": "2023-08"}
    }
    init(){
      //this.subscribeLigData();
      //this.subscribeFilterControlValueChanges();
      this.initFilterFormControls();
    }
    public initFilterFormControls(): void {
      this.filtersAvailable.forEach(filter=>{
        this.filterFormControls.set( filter, 
           {
            filterControl :  new FormControl(''),
            filterOptionsAll : [],
            filterOptionsCurrent$ : new Observable<string[]>(),
            filtersSelected : [],
          }
        )
      })
    }
    public setFilterValues():void{

      this.filtersAvailable.forEach((filter)=>{
        const tempfilterFormControl = this.filterFormControls.get(filter);
        if(tempfilterFormControl){
          tempfilterFormControl.filterOptionsAll = this.filtersUniqueValues[filter]
          this.filterFormControls.set(filter , tempfilterFormControl);
        }
      })

      this.subscribeFilterControlValueChanges();
    }

    public subscribeFilterControlValueChanges():void{

      this.filtersAvailable.forEach((filter)=>{
        const tempfilterFormControl = this.filterFormControls.get(filter);

        if(tempfilterFormControl){
          tempfilterFormControl.filterOptionsCurrent$ = tempfilterFormControl.filterControl?.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(tempfilterFormControl.filterOptionsAll , value || '')),
          )
        }

      })

    }
    private _filter( filterData:Array<string> , filterValue: string): string[] {
      const filterValueLower = filterValue.toLowerCase();
      if(!filterData){
        return [];
      }
      else{
        if(!filterValue){
          return filterData;
        }
        return filterData.filter(option => option.toLowerCase().startsWith(filterValueLower));
      }
      
    }
    public optionSelectedHandler(event: MatAutocompleteSelectedEvent, autoCompleteId:string):void {

      //Add update filter value
      this.addNewFilter(autoCompleteId , event.option.value)
    }
    public optionRemoveHandler(filterValue:string,filterKey:string,):void{
      this.removeNewFilter(filterKey,filterValue)
    }
    public addNewFilter(filterId:string,filterValue:string):void{
      //this.filtersApplied[filterId] = filterValue

      //
      const tempFilterControl = this.filterFormControls.get(filterId)
      if(tempFilterControl && tempFilterControl.filtersSelected ){
        tempFilterControl.filterControl.reset();
        tempFilterControl.filtersSelected = [...tempFilterControl.filtersSelected,filterValue]
        this.filterFormControls.set(filterId , tempFilterControl)
      }
      //
      this.mapFilterControlsToFilter();
      //
      this.initateGetLigDataApiCall(this.filtersApplied);

    }
    public removeNewFilter(filterKey:string,filterValue:string): void{
      // if(this.filtersApplied[filterId]){
      //   delete this.filtersApplied[filterId];
      // }

      const tempFilterControl = this.filterFormControls.get(filterKey)
      if(tempFilterControl && tempFilterControl.filtersSelected && tempFilterControl.filtersSelected .length >0){
        const removedFilter = tempFilterControl.filtersSelected.filter((filterSelectedEle)=>
          filterSelectedEle !== filterValue
        )
        tempFilterControl.filtersSelected = removedFilter
        this.filterFormControls.set(filterKey , tempFilterControl)
      }
      
      this.mapFilterControlsToFilter();
      this.initateGetLigDataApiCall(this.filtersApplied);
    }
    public mapFilterControlsToFilter(){
      this.filterFormControls.forEach((value,key) => {
        this.filtersApplied[key]=value.filtersSelected[0];
      });
    }
    public formSubmitHandler():void{
      const filterObj: LigDataFilterIModel ={
        "month": "2023-08",
        user_persona : this.userPersonaFilterControl.value
      }
      
      console.log("User Persona Filter Value", filterObj )
      this.initateGetLigDataApiCall(filterObj);
    }
    public destroy():void{
      this.subsList.forEach((sub)=>sub.unsubscribe())
    }
    public initateGetLigDataApiCall(filterObj: LigDataFilterIModel ){
      this.ligDashBoardModel2.initateGetLigDataCall(filterObj)
    }
}