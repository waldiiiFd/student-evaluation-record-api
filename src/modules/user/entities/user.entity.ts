import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @Column()
  role: number;
}
