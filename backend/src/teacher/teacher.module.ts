import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'; // ✅ import MulterModule
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // ✅ uploaded files will be stored here
    }),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
