import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent implements OnInit {
  student: Student;
  /**
   * Constructing Http Student Service
   * @param studentService 
   */
  constructor(private studentService: StudentService,
                private messageService: MessageService) { }

  ngOnInit(): void {
    this.student = new Student();
  }

  /**
   * Store a Student to backend server
   */
  save() {
    this.studentService.createStudent(this.student)
          .subscribe((message: Message) => {
            console.log(message);
            let student = message.students[0];
            let msg = "Success -> Post a Student: " 
                + "<ul>"
                    + "<li>id: " + student._id + "</li>"  
                    + "<li>firstname: " + student.firstname + "</li>"
                    + "<li>subjects: " + student.subjects + "</li>"
                    + "<li>joinedDate: " + student.joinedDate + "</li>"
                    + "<li>address: " + student.address + "</li>"
                + "</ul>";

            this.messageService.add(msg);
          }, error => {
            console.log(error);
            let msg = "Error! -> Action Posting a Student:" 
                      + "<ul>"
                        + "<li>id = " + this.student._id + "</li>"  
                        + "<li>firstname = " + this.student.firstname + "</li>"
                        + "<li>subjects = " + this.student.subjects + "</li>"
                        + "<li>joinedDate = " + this.student.joinedDate + "</li>"
                        + "<li>address = " + this.student.address + "</li>"
                      + "</ul>";

            this.messageService.add(msg);
          });
  }

  reset(){
    this.student = new Student();
  }

  /**
   * Function handles form submitting
   */
  onSubmit() {
    this.save();
    this.reset();
  }
}