import { Injectable } from "@angular/core";
import {FormControl} from '@angular/forms';

import { Observable , Subscription, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { LigDashboardModel2} from './lig-dashboard2.model'

import { FilterIModel } from './../../models/api/lig-data-reponse.model';
import { LigDataFilterIModel } from "../../models/api/lig-data-request.model";


export interface FiterFormControlIModel {
  [key : string] :{
    filterControl : FormControl;
    filterOptionsAll: Array<string>;
    filterOptionsCurrent$: Observable<string[]> 
  }
}

@Injectable()
export class LigDashboardFilterModel {

    private subsList : Array<Subscription> = new Array<Subscription>();

    public filters : any;

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

    /* ------------------------ filter related propertires start --------------------- */

    private filtersApplied : LigDataFilterIModel;

  
    constructor(private ligDashBoardModel2 : LigDashboardModel2) {
      this.filtersApplied = { "month": "2023-08"}
    }
    init(){
      //this.subscribeLigData();
      //this.subscribeFilterControlValueChanges();
    }

    public setFilterValues(filters:FilterIModel):void{

      this.channelParnterFilterOptionsAll = filters?.sap_cc_number;
      this.userPersonaFilterOptionsAll = filters?.user_persona;
      this.talukaFilterOptionsAll = filters?.taluka;
      this.biTerriotoaryFilterOptionsAll = filters?.SALES_OFFICE_NAME

      this.channelParnterFilterOptionsCurrent$= of(filters?.sap_cc_number)
      this.userPersonaFilterOptionsCurrent$= of(filters?.user_persona)
      this.talukaFilterOptionsCurrent$= of(filters?.taluka)
      this.biTerriotoaryFilterOptionsCurrent$= of(filters?.SALES_OFFICE_NAME)

      this.subscribeFilterControlValueChanges();

    }
    public subscribeFilterControlValueChanges():void{

      this.channelParnterFilterOptionsCurrent$ = this.channelParnterFilterControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(this.channelParnterFilterOptionsAll , value || '')),
      );

      this.userPersonaFilterOptionsCurrent$ = this.userPersonaFilterControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(this.userPersonaFilterOptionsAll , value || '')),
     );

     this.talukaFilterOptionsCurrent$ = this.talukaFilterControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.talukaFilterOptionsAll , value || '')),
    );

    this.biTerriotoaryFilterOptionsCurrent$ = this.biTerriotoaryFilterControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.biTerriotoaryFilterOptionsAll , value || '')),
    );
    
    
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
      this.addNewFilter(autoCompleteId , event.option.value)
    }
    public addNewFilter(filterId:string,filterValue:string):void{
      this.filtersApplied[filterId] = filterValue
      this.initateGetLigDataApiCall(this.filtersApplied);

    }
    public removeNewFilter(filterId:string): void{
      if(this.filtersApplied[filterId]){
        delete this.filtersApplied[filterId];
      }
      this.initateGetLigDataApiCall(this.filtersApplied);
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