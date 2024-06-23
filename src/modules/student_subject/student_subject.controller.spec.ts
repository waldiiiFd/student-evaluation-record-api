import { Test, TestingModule } from '@nestjs/testing';
import { StudentSubjectController } from './student_subject.controller';
import { StudentSubjectService } from './student_subject.service';

describe('StudentSubjectController', () => {
  let controller: StudentSubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentSubjectController],
      providers: [StudentSubjectService],
    }).compile();

    controller = module.get<StudentSubjectController>(StudentSubjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
