import { Employee } from './employee';
export interface StorageOffices {
  id: string;
  name: string;
  address: string;
  employees: Employee[];
}
