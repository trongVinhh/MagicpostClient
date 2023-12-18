import { Transaction } from "./transaction";

export interface Order {
  id: string;
  currentStorageName: string;
  currentStorageAddress: string
  transaction: Transaction;
}
