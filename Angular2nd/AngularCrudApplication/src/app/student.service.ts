import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Student } from './student';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  /**
   * Do a posting Student
   * @param student 
   */
  createStudent(student: Student): Observable<Message> {
      return this.http.post<Message>(`${this.baseUrl}` + `/student/create`, student)
                  .pipe(
                    retry(3),
                    catchError(this.handleError)
                  );
  }

  updateStudent(student: Student): Observable<Message> {
      return this.http.put<Message> (`${this.baseUrl}` + `/student/updatebyid/` + student._id, student)
        .pipe(
            retry(3),
            catchError(this.handleError)
          );
  }

  deleteStudent(_id: string): Observable<Message> {
      return this.http.delete<Message>(`${this.baseUrl}` + `/student/deletebyid/` + _id)
            .pipe(
              retry(3),
              catchError(this.handleError)  
            );
  }

  /**
   * Retrieve all student from Backend
   */
  retrieveAllStudents(): Observable<Message> {
      return this.http.get<Message>(`${this.baseUrl}` + `/student/retrieveinfos`)
                    .pipe(
                      retry(3),
                      catchError(this.handleError)
                    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}