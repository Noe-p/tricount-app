import { Category } from './Category';
import { User } from './User';

export interface Expense {
  id: string;
  label: string;
  amount: number;
  category: Category;
  user: User;
  date: Date;
  participants: User[];
}

export interface UsersAmount {
  user: User;
  balance: number;
}
