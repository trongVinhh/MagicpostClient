import { Employee } from "./employee";

export interface TransactionOffices {
  id: string;
  name: string;
  hotline: string;
  address: string;
  email: string;
  employees: Employee[];
}
