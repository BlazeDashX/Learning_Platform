import { Injectable } from '@nestjs/common';

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
}
