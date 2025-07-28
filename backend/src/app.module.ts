import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module'; 
@Module({
  imports: [AdminModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}