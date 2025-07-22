import { StudentService } from './student.service';
import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';


@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}


    @Get()
    getAll(){
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    getOne(@Param('id') id:string){
        return this.studentService.getStudentById(Number(id));
    }
    @Post()
    create(@Body()body:{name: string,age:number}){
        return this.studentService.createStudent(body);
    }

    @Put(':id')

    updatefull(@Param('id') id:string, @Body() body:{name:string, age:number})
    {
        return this.studentService.updateStudent(Number(id),body);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() body:Partial<{name:string, age:number}>)
    {
        return this.studentService.patchStudent(Number(id),body);
    }

    @Delete(':id')
    remove(@Param('id') id:string)
    {
        return this.studentService.deleteStudent(Number(id));
    }
}
