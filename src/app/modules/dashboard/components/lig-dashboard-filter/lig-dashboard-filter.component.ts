import { Component, OnInit,OnChanges, OnDestroy, Input,SimpleChanges } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { LigDashboardFilterModel } from '../../domain/models/lig-dashboard-filter.model';

import { FiterControlIModel } from "../../models/lig-dashboard-filter.model";


@Component({
  selector: 'app-lig-dashboard-filter',
  templateUrl: './lig-dashboard-filter.component.html',
  styleUrls: ['./lig-dashboard-filter.component.css'],
  providers: [LigDashboardFilterModel]
})
export class LigDashboardFilterComponent implements OnInit,OnChanges, OnDestroy {

  constructor(private ligDashboardFilterModel : LigDashboardFilterModel) { }

  @Input() 
  get filters():any{
    return this.ligDashboardFilterModel.filtersUniqueValues;
  }
  set filters(val:any){
    this.ligDashboardFilterModel.filtersUniqueValues=val;
  }

  get channelParnterFilterControl():FormControl{
    return this.ligDashboardFilterModel.channelParnterFilterControl
  }
  get channelParnterFilterOptionsCurrent$():Observable<string[]>{
    return this.ligDashboardFilterModel.channelParnterFilterOptionsCurrent$
  }
  get userPersonaFilterControl():FormControl{
    return this.ligDashboardFilterModel.userPersonaFilterControl
  }
  get userPersonaFilterOptionsCurrent$():Observable<string[]>{
    return this.ligDashboardFilterModel.userPersonaFilterOptionsCurrent$
  }
  get talukaFilterControl():FormControl{
    return this.ligDashboardFilterModel.talukaFilterControl
  }
  get talukaFilterOptionsCurrent$():Observable<string[]>{
    return this.ligDashboardFilterModel.talukaFilterOptionsCurrent$
  }

  get biTerriotoaryFilterControl():FormControl{
    return this.ligDashboardFilterModel.biTerriotoaryFilterControl
  }
  get biTerriotoaryFilterOptionsCurrent$():Observable<string[]>{
    return this.ligDashboardFilterModel.biTerriotoaryFilterOptionsCurrent$
  }

  get filterFormControls(): Map<string , FiterControlIModel>{
    return this.ligDashboardFilterModel.filterFormControls
  }
  get filtersAvailable():Array<string>{
    return this.ligDashboardFilterModel.filtersAvailable;
  }


  ngOnInit(): void {
    this.ligDashboardFilterModel.init();
  }
  ngOnChanges(changes: SimpleChanges):void{
    if(changes.filters){
      this.ligDashboardFilterModel.setFilterValues();
    }
    
  }
  public formSubmitHandler():void {
    this.ligDashboardFilterModel.formSubmitHandler()
  }
  public optionSelectedHandler(event: MatAutocompleteSelectedEvent, autoCompleteId:any): void {
    this.ligDashboardFilterModel.optionSelectedHandler(event,autoCompleteId)
  }
  public optionRemoveHandler(selctedFilterValue:string,filterKey:string){
    this.ligDashboardFilterModel.optionRemoveHandler(selctedFilterValue,filterKey)
  }
  ngOnDestroy(): void {
  }

}
