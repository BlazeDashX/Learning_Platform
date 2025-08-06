import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from './entities/teacher.entity'; // Your entity for DB

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([Teacher]), // Needed for DB access
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
