import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentTeacherService } from './student_teacher.service';
import { CreateStudentTeacherDto } from './dto/create-student_teacher.dto';
import { UpdateStudentTeacherDto } from './dto/update-student_teacher.dto';

@Controller('student-teacher')
export class StudentTeacherController {
  constructor(private readonly studentTeacherService: StudentTeacherService) {}

  @Post()
  create(@Body() createStudentTeacherDto: CreateStudentTeacherDto) {
    return this.studentTeacherService.create(createStudentTeacherDto);
  }

  @Get()
  findAll() {
    return this.studentTeacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentTeacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentTeacherDto: UpdateStudentTeacherDto) {
    return this.studentTeacherService.update(+id, updateStudentTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentTeacherService.remove(+id);
  }
}
