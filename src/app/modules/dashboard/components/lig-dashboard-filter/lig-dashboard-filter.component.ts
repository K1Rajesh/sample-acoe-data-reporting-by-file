import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

import { LigDashboardModel } from '../../domain/models/lig-dashboard.model'
@Component({
  selector: 'app-lig-dashboard-filter',
  templateUrl: './lig-dashboard-filter.component.html',
  styleUrls: ['./lig-dashboard-filter.component.css']
})
export class LigDashboardFilterComponent implements OnInit {

  constructor(private ligDashboardModel : LigDashboardModel) { }
  get channelParnterFilterControl():FormControl{
    return this.ligDashboardModel.channelParnterFilterControl
  }
  get channelParnterFilterOptionsCurrent$():Observable<string[]>{
    return this.ligDashboardModel.channelParnterFilterOptionsCurrent$
  }
  get userPersonaFilterControl():FormControl{
    return this.ligDashboardModel.userPersonaFilterControl
  }
  get userPersonaFilterOptionsCurrent$():Observable<string[]>{
    return this.ligDashboardModel.userPersonaFilterOptionsCurrent$
  }
  get talukaFilterControl():FormControl{
    return this.ligDashboardModel.talukaFilterControl
  }
  get talukaFilterOptionsCurrent$():Observable<string[]>{
    return this.ligDashboardModel.talukaFilterOptionsCurrent$
  }



  ngOnInit(): void {
  }
  public formSubmitHandler():void {
    this.ligDashboardModel.formSubmitHandler()
  }

}
