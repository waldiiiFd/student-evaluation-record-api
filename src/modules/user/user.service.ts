import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto} from "./dto";
import { Role } from "../common/enums/role.enum";
import { User } from "./entities";
//import { MailService } from "../mail/mail.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    //private mailService:MailService
  ) {}

  async create_user(createUserDto: CreateUserDto) {
    // Verificar que el rol es válido
    const roles = Object.values(Role);
    if (!roles.includes(createUserDto.role)) {
      throw new BadRequestException(`Rol '${createUserDto.role}' is not valid`);
    }
  
    // Verificar que el email no esté en uso
    const foundUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
  
    if (foundUser) {
      throw new BadRequestException(
        `User with email '${createUserDto.email}' already exists`
      );
    }
  
    // Crear el nuevo usuario
    const newUser = new User(); // Asegúrate de que la clase se llame User con la primera letra mayúscula
    
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password; // No olvides encriptar la contraseña
    newUser.role = createUserDto.role; // Asignar el rol directamente del DTO
  
    const createdUser = await this.userRepository.save(newUser);
  
    // Enviar correo de bienvenida si el rol es estudiante
   /*  if (newUser.role === Role.STUDENT) {
      try {
        await this.mailService.sendMail(newUser.email, newUser.name);
      } catch (error) {
        console.error('Failed to send welcome email:', error);
        throw new InternalServerErrorException('Failed to send welcome email', error);
      }
    } */
  
    return createdUser;
  }

  

  async get_users(): Promise<User[]> {
    return await this.userRepository.find({ relations: ["teacher"] });
  }

  async get_user(id: number): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return foundUser;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ["role"],
    });
  }

  async delete_user(email: string): Promise<void> {
    const userToDelete = await this.findOneByEmail(email)

    if (!userToDelete) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    await this.userRepository.remove(userToDelete);
  }

  async update_user(email:string,userUpdate: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.findOneByEmail(email);

    if (!userToUpdate) {
      throw new NotFoundException(`User with id ${email} not found`);
    }

    if (userUpdate.new_password) {
      userToUpdate.password = userUpdate.new_password;
    }
    const updatedUser = await this.userRepository.save(userToUpdate);

    return updatedUser;
  }

/*   async update_user_role(
    id: number,
    userRoleUpdate: UpdateUserRoleDto
  ): Promise<user> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });

    if (!userToUpdate) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const foundRole = await this.roleRepository.findOne({
      where: { role: userRoleUpdate.role },
    });

    if (!foundRole) {
      throw new BadRequestException(`Role '${userRoleUpdate.role}' not found`);
    }

    userToUpdate.role = foundRole;

    const updatedUser = await this.userRepository.save(userToUpdate);

    return updatedUser;
  } */
}
