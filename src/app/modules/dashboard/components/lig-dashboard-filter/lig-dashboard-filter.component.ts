import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

import { LigDashboardFilterModel } from '../../domain/models/lig-dashboard-filter.model'

@Component({
  selector: 'app-lig-dashboard-filter',
  templateUrl: './lig-dashboard-filter.component.html',
  styleUrls: ['./lig-dashboard-filter.component.css'],
  providers: [LigDashboardFilterModel]
})
export class LigDashboardFilterComponent implements OnInit,OnDestroy {

  constructor(private ligDashboardFilterModel : LigDashboardFilterModel) { }
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
  ngOnInit(): void {
    this.ligDashboardFilterModel.init();
  }
  public formSubmitHandler():void {
    this.ligDashboardFilterModel.formSubmitHandler()
  }
  ngOnDestroy(): void {
  }

}
