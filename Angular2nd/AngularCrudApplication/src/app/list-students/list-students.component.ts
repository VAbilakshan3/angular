import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { MessageService } from '../message.service';
import {StudentService } from '../student.service';
import { Message } from '../message';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html'
})
export class ListStudentsComponent implements OnInit {

  students: Array<Student> = [];
  showStudent: Student;
  isSelected: boolean = false;
  deletedStudent: Student;
  returnedMessage: string;

  constructor(private studentService: StudentService,
                private messageService: MessageService) { }

  setStudentDetails(student: Student){
    this.isSelected=!this.isSelected;
    if(this.isSelected){
      this.showStudent = student;
    }else{
      this.showStudent = undefined;
    }
  }

  /**
   * Set deletedStudent and reset returnedMessage = undefined
   * @param deleteStudent
   */
  prepareDeleteStudent(deleteStudent: Student){
    //assign delete-Student
    this.deletedStudent = deleteStudent;
    // reset returned-Message
    this.returnedMessage = undefined;
  }

  /**
   * Delete a Student by ID
   */
  deleteStudent(){

    console.log("--- Access delelteStudent() function");

    this.studentService.deleteStudent(this.deletedStudent._id)
                      .subscribe((message: Message) => {
                          console.log(message);
                          // remove a deletedStudent from students list on view
                          this.students = this.students.filter(student => {
                            return student._id != this.deletedStudent._id;
                          })

                          // set a showing message in delete modal
                          this.returnedMessage = message.message;

                          // just reset showStudent for not showing on view
                          this.showStudent = undefined;

                          // add the delete message to message app for showing
                          this.messageService.add(message.message);
                        },
                        (error) => {
                          console.log(error);
                          let errMsg: string = "Error! Details: " + error;
                          this.messageService.add(errMsg);
                        });
  }

  /**
   * Update Student function
   */
  updateStudent() {
    this.studentService.updateStudent(this.showStudent)
                      .subscribe((message: Message) => {
                        console.log(message);
                        // update students list
                        this.students.map(x => {
                          if(x._id == this.showStudent._id){
                            x = this.showStudent;
                          }
                        });

                        let msg: string = "Update Successfully! -> New Student's properties: <br>"
                                          + "<ul>"
                                            + "<li>" + "id: " + this.showStudent._id + "</li>"
                                            + "<li>" + "firstname: " + this.showStudent.firstname + "</li>"
                                            + "<li>" +  "subjects: " + this.showStudent.subjects + "</li>"
                                            + "<li>" +  "joinedDate: " + this.showStudent.joinedDate + "</li>"
                                            + "<li>" +  "address: " + this.showStudent.address + "</li>"
                                          + "</ul>";
                        this.messageService.add(msg);
                      }
                      , (error) => {
                        console.log(error);
                        let errMsg = "Update Fail ! Error = " + error;
                        this.messageService.add(errMsg);
                      });
  }

  /**
   * Retrieve all Student from Backend
   */
  retrieveAllStudents() {
    this.studentService.retrieveAllStudents()
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.students = message.students;
                  }
                  , (error) => {
                    console.log(error);
                  });
  }

  ngOnInit(): void {
    this.retrieveAllStudents();
  }
}