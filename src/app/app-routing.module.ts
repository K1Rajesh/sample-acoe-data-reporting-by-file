import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LigDashboardComponent } from './components/lig-dashboard/lig-dashboard.component';

const routes: Routes = [
  {
    path:'lig-dashboard',
    component: LigDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
