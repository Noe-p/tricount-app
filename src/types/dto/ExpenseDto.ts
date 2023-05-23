export interface ExpenseDto {
  label: string;
  amount: number;
  id_category?: string | null;
  id_user: string;
  date: Date;
  participants: string[];
}
