import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateAdminDto } from './admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/addadmin')
  @UsePipes(new ValidationPipe())
  addAdmin(@Body() data: CreateAdminDto): string {
    console.log(data);
    return this.adminService.addAdmin(data);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully', filename: file.filename };
  }

  @Get('contents')
  getAllContent(@Query('type') type: string) {
    return this.adminService.getAllContent(type);
  }

  @Delete('remove-content/:id')
  removeContent(@Param('id') id: string) {
    return this.adminService.removeContent(id);
  }

  @Get('teachers')
  getAllTeachers() {
    return this.adminService.getAllTeachers();
  }

  @Get('teacher/:id')
  getTeacherById(@Param('id') id: string) {
    return this.adminService.getTeacherById(id);
  }

  @Delete('remove-teacher/:id')
  removeTeacher(@Param('id') id: string) {
    return this.adminService.removeTeacher(id);
  }

  @Get('students')
  getAllStudents() {
    return this.adminService.getAllStudents();
  }

  @Get('student/:id')
  getStudentById(@Param('id') id: string) {
    return this.adminService.getStudentById(id);
  }

  @Delete('remove-student/:id')
  removeStudent(@Param('id') id: string) {
    return this.adminService.removeStudent(id);
  }
}
