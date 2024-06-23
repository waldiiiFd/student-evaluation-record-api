import { Test, TestingModule } from '@nestjs/testing';
import { StudentTeacherController } from './student_teacher.controller';
import { StudentTeacherService } from './student_teacher.service';

describe('StudentTeacherController', () => {
  let controller: StudentTeacherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentTeacherController],
      providers: [StudentTeacherService],
    }).compile();

    controller = module.get<StudentTeacherController>(StudentTeacherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
