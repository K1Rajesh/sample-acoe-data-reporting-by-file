import { Injectable } from "@angular/core";
import {FormControl} from '@angular/forms';

import { Observable , Subscription, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';


import { LigDashboardModel2} from './lig-dashboard2.model'

import { FilterIModel } from './../../models/api/lig-data-reponse.model';



@Injectable()
export class LigDashboardFilterModel {

    private subsList : Array<Subscription> = new Array<Subscription>();

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

  
    // get ligDataServiceLigData$() : Observable<Array<LigDashboardDataModel>> | undefined {
    //   return this.ligDashBoardModel2.ligDataServiceLigData$
    // }
    constructor(private ligDashBoardModel2 : LigDashboardModel2) {

    }
    init(){
      //this.subscribeLigData();
      this.subscribeFilterControlValueChanges();
    }

    // private subscribeLigData(payLoad?:{user_persona:string}):void{

    //     this.subsList.push(
    //        this.ligDataServiceLigData$!.subscribe(
    //         (ligData : any) =>{
    //           if(ligData){
    //             if(ligData.filters){
    //               //console.log("user_persona unique val:", ligData.filters.user_persona)
    //               this.setFilterValues(ligData.filters)
    //             }         
    //           }
    //         }, 
    //         (err:any) =>{console.log("getLigData API Error: ",err)} 
    //       )
    //     )
    // }  

    public setFilterValues(filters:FilterIModel):void{

      this.channelParnterFilterOptionsAll = filters.ChannelPartner;
      this.userPersonaFilterOptionsAll = filters.LIGUserPersona;
      this.talukaFilterOptionsAll = filters.LIGTaluka;
      this.stateFilterOptionsAll = filters.LIGState;
      this.biTerriotoaryFilterOptionsAll = filters.BITerritory

      this.channelParnterFilterOptionsCurrent$= of(filters.ChannelPartner)
      this.userPersonaFilterOptionsCurrent$= of(filters.LIGUserPersona)
      this.talukaFilterOptionsCurrent$= of(filters.LIGTaluka)
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
    
    }
    private _filter( filterData:Array<string> , filterValue: string): string[] {
      const filterValueLower = filterValue.toLowerCase();
      if(!filterValue){
        filterData;
      }
      return filterData.filter(option => option.toLowerCase().startsWith(filterValueLower));
    }
    public formSubmitHandler():void{
      const userPersona = this.userPersonaFilterControl.value
      console.log("User Persona Filter Value", userPersona )
      this.ligDashBoardModel2.initateGetLigDataCall({user_persona:userPersona})
    }
    public destroy():void{
      this.subsList.forEach((sub)=>sub.unsubscribe())
    }
}