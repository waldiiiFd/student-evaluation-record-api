import { Test, TestingModule } from '@nestjs/testing';
import { StudentTeacherService } from './student_teacher.service';

describe('StudentTeacherService', () => {
  let service: StudentTeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentTeacherService],
    }).compile();

    service = module.get<StudentTeacherService>(StudentTeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
