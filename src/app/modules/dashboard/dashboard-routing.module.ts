import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LigDashboardComponent } from './components/lig-dashboard/lig-dashboard.component';

const dashboardRoutes: Routes = [
  {
    path:'lig-dashboard',
    component: LigDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
