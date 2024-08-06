import { Role } from "../enums/role.enum";

interface role {
  id: number;
  role: string;
}

export interface UserInterface {
  email: string;
  role: Role;
}