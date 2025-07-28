import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TeacherService, Class, Content } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('profile')
  getProfile() {
    return this.teacherService.getProfile();
  }

  @Put('profile')
  updateProfile(@Body() body: any) {
    return this.teacherService.updateProfile(body);
  }

  @Post('class')
  createClass(@Body() body: any): { message: string; class: Class } {
    return this.teacherService.createClass(body);
  }

  @Get('classes')
  getAllClasses(): Class[] {
    return this.teacherService.getAllClasses();
  }

  @Delete('class/:id')
  deleteClass(@Param('id') id: string) {
    return this.teacherService.deleteClass(id);
  }

  @Post('content')
  postContent(@Body() body: any): { message: string; content: Content } {
    return this.teacherService.postContent(body);
  }

  @Get('contents')
  getAllContents(): Content[] {
    return this.teacherService.getAllContents();
  }

  @Delete('content/:id')
  deleteContent(@Param('id') id: string) {
    return this.teacherService.deleteContent(id);
  }
}
