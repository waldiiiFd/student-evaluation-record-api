import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { Teacher } from '../teacher/entities/teacher.entity';
//import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([User,Teacher]),
  /* MailModule */],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
