import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  postContent(body: any, user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: 'Content posted', data: body, postedBy: user };
  }

  getAllContent(type?: string) {
    return { message: 'All content', filter: type || 'none' };
  }

  removeContent(id: string) {
    return { message: `Content with ID ${id} removed` };
  }

  getAllTeachers() {
    return { message: 'List of teachers' };
  }

  getTeacherById(id: string) {
    return { message: `Details for teacher ${id}` };
  }

  removeTeacher(id: string) {
    return { message: `Teacher with ID ${id} removed` };
  }

  getAllStudents() {
    return { message: 'List of students' };
  }

  getStudentById(id: string) {
    return { message: `Details for student ${id}` };
  }

  removeStudent(id: string) {
    return { message: `Student with ID ${id} removed` };
  }

  customResponse() {
    return { message: 'This is a custom response' };
  }
}
