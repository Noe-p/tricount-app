import { User } from '../ui';

export interface ExpenseApi {
  id: string;
  label: string;
  amount: number;
  id_category: string;
  id_user: string;
  date: string;
  participants: User[];
}
