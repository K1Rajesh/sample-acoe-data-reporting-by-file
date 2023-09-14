import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LigDashboardComponent } from './components/lig-dashboard/lig-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { LigHeaderPipe } from './components/lig-dashboard/lig-header.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LigDashboardComponent,
    LigHeaderPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
