import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';

import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './message/message.component';
import { ViewStudentComponent } from './view-student/view-student.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    ListStudentsComponent,
    MessageComponent,
    ViewStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }