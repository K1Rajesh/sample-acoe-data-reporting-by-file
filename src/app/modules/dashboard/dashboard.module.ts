import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LigDashboardComponent } from './components/lig-dashboard/lig-dashboard.component';
import { DashBoardRoutingModule} from './dashboard-routing.module';
import { LigHeaderPipe } from './components/lig-dashboard/lig-header.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LigDashboardFilterComponent } from './components/lig-dashboard-filter/lig-dashboard-filter.component';


@NgModule({
  declarations: [
    LigDashboardComponent,
    LigHeaderPipe,
    LigDashboardFilterComponent
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports:[
    LigDashboardComponent
  ]
})
export class DashboardModule { }
