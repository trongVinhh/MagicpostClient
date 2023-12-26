import { Role } from "./role";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  username: string;
  password: string;
  role: Role[];
}
