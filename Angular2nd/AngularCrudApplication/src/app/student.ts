import { Date } from 'mongoose';


export class Student {
    _id: string;
    firstname: string;
    subjects: [string];
    joinedDate: Date;
    address: string
}
