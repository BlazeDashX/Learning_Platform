import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeacherService, Class, Content } from './teacher.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PostContentDto } from './dto/post-content.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherStatusDto } from './dto/update-teacher-status.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  // ========== Profile ==========
  @Get('profile')
  getProfile() {
    return this.teacherService.getProfile();
  }
@Get('ping')
ping() {
  return { message: 'pong' };
}

  @Put('profile')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateProfile(@Body() body: UpdateProfileDto) {
    return this.teacherService.updateProfile(body);
  }

  // ========== Class ==========
  @Post('class')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createClass(@Body() body: CreateClassDto): { message: string; class: Class } {
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

  // ========== Content ==========
  @Post('content')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  postContent(@Body() body: PostContentDto): { message: string; content: Content } {
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

  // ========== File Upload ==========
  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF files are allowed!');
    }

    return {
      message: 'File uploaded successfully',
      fileName: file.originalname,
    };
  }

  // ========== Teacher CRUD for User Category 1 ==========
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createTeacher(@Body() dto: CreateTeacherDto) {
    return this.teacherService.createTeacher(dto);
  }

  @Patch(':id/status')
  updateTeacherStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTeacherStatusDto,
  ) {
    return this.teacherService.updateTeacherStatus(id, dto);
  }

  @Get('inactive')
  getInactiveTeachers() {
    return this.teacherService.getInactiveTeachers();
  }

  @Get('older-than-40')
  getTeachersOlderThan40() {
    return this.teacherService.getTeachersOlderThan40();
  }
}
