import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Request,
  Response,
} from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Post('post-content')
  postContent(@Body() body, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return { message: 'Content posted', data: body, postedBy: req.user };
  }

  @Get('contents')
  getAllContent(@Query('type') type: string) {
    return { message: 'All content', filter: type || 'none' };
  }

  @Delete('remove-content/:id')
  removeContent(@Param('id') id: string) {
    return { message: `Content with ID ${id} removed` };
  }

  @Get('teachers')
  getAllTeachers() {
    return { message: 'List of teachers' };
  }

  @Get('teacher/:id')
  getTeacherById(@Param('id') id: string) {
    return { message: `Details for teacher ${id}` };
  }

  @Delete('remove-teacher/:id')
  removeTeacher(@Param('id') id: string) {
    return { message: `Teacher with ID ${id} removed` };
  }

  @Get('students')
  getAllStudents() {
    return { message: 'List of students' };
  }

  @Get('student/:id')
  getStudentById(@Param('id') id: string) {
    return { message: `Details for student ${id}` };
  }

  @Delete('remove-student/:id')
  removeStudent(@Param('id') id: string) {
    return { message: `Student with ID ${id} removed` };
  }
}
