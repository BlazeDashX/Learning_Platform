import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherStatusDto } from './dto/update-teacher-status.dto';

export interface Class {
  id: string;
  [key: string]: any;
}

export interface Content {
  id: string;
  [key: string]: any;
}

@Injectable()
export class TeacherService {
  private profile = {
    name: 'Mr. Afrid',
    subject: 'Computer Science',
  };

  private classes: Class[] = [];
  private contents: Content[] = [];

  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  getProfile() {
    return this.profile;
  }

  updateProfile(updated: any) {
    this.profile = { ...this.profile, ...updated };
    return { message: 'Profile updated', profile: this.profile };
  }

  createClass(data: any): { message: string; class: Class } {
    const newClass: Class = { id: Date.now().toString(), ...data };
    this.classes.push(newClass);
    return { message: 'Class created', class: newClass };
  }

  getAllClasses(): Class[] {
    return this.classes;
  }

  deleteClass(id: string) {
    this.classes = this.classes.filter((cls) => cls.id !== id);
    return { message: `Class ${id} deleted` };
  }

  postContent(content: any): { message: string; content: Content } {
    const newContent: Content = { id: Date.now().toString(), ...content };
    this.contents.push(newContent);
    return { message: 'Content posted', content: newContent };
  }

  getAllContents(): Content[] {
    return this.contents;
  }

  deleteContent(id: string) {
    this.contents = this.contents.filter((c) => c.id !== id);
    return { message: `Content ${id} deleted` };
  }

  async createTeacher(dto: CreateTeacherDto) {
    if (!dto.status) {
      dto.status = 'active';
    }
    const teacher = this.teacherRepo.create(dto);
    return this.teacherRepo.save(teacher);
  }

  async updateTeacherStatus(id: number, dto: UpdateTeacherStatusDto) {
  const result = await this.teacherRepo.update(id, { status: dto.status });

  if (result.affected === 1) {
    return { message: `Successfully changed status to '${dto.status}' for teacher ID ${id}` };
  } else {
    return { message: `Teacher with ID ${id} not found or status not changed` };
  }
}


  getInactiveTeachers() {
    return this.teacherRepo.find({ where: { status: 'inactive' } });
  }

  getTeachersOlderThan40() {
    return this.teacherRepo
      .createQueryBuilder('teacher')
      .where('teacher.age > :age', { age: 40 })
      .getMany();
  }
}
