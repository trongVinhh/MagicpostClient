import { Customer } from "./customer";

export interface Transaction {
  id: string;
  totalPrice: number;
  mass: number;
  orderCode: string;
  receiveAddress: string;
  receiverName: string;
  phoneNumber: string;
  employeeId: string;
  transactionOfficeId: string;
  customerDto: Customer;
  date: Date;
  packageType: string;
  postage: number;
}
