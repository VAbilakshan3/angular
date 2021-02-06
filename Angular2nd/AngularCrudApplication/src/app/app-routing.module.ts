import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';

const routes: Routes = [
  { 
    path: '', 
    component: AddStudentComponent 
  },
  { 
    path: 'students', 
    component: ListStudentsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }