import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeacherService, Class, Content } from './teacher.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PostContentDto } from './dto/post-content.dto';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('profile')
  getProfile() {
    return this.teacherService.getProfile();
  }

  @Put('profile')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateProfile(@Body() body: UpdateProfileDto) {
    return this.teacherService.updateProfile(body);
  }

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

  @Post('content')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  postContent(@Body() body: PostContentDto): { message: string; content: Content } {
    return this.teacherService.postContent(body);
  }

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


  @Get('contents')
  getAllContents(): Content[] {
    return this.teacherService.getAllContents();
  }

  @Delete('content/:id')
  deleteContent(@Param('id') id: string) {
    return this.teacherService.deleteContent(id);
  }
}
