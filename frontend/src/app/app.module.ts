import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { SignupComponent } from './signup/signup.component';
import { ResumeUploadComponent } from './signup/resume-upload/resume-upload.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component'
import { SafePipeModule } from 'safe-pipe';
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    SignupComponent,
    ResumeUploadComponent,
    LoginComponent,
    DashBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    SafePipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

