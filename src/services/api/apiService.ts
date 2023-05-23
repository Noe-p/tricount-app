import {
  Category,
  CategoryDto,
  Expense,
  ExpenseApi,
  ExpenseDto,
  User,
  UserDto,
} from '../../types';
import { get, post, put, remove } from './api';

//CATEGORIES
export async function getAllCategories(): Promise<Category[]> {
  const response = await get('categories');
  return response?.json();
}

export async function getOneCategory(id: string): Promise<Category> {
  const response = await get(`categories/${id}`);
  const cat = await response?.json();
  return { ...cat[0], id: id };
}

export async function removeCategory(id: string): Promise<void> {
  await remove(`categories/${id}`);
}

export async function createCategory(category: CategoryDto): Promise<void> {
  await post('categories', category);
}

export async function updateCategory(
  id: string,
  category: CategoryDto
): Promise<void> {
  await put(`categories/${id}`, category);
}

//USERS
export async function getAllUsers(): Promise<User[]> {
  const response = await get('users');
  return response?.json();
}

export async function getOneUser(id: string): Promise<User> {
  const response = await get(`users/${id}`);
  const user = await response?.json();
  return { ...user[0], id: id };
}

export async function removeUser(id: string): Promise<void> {
  await remove(`users/${id}`);
}

export async function createUser(user: UserDto): Promise<User[]> {
  const response = await post('users', user);
  return response?.json();
}

export async function updateUser(id: string, user: UserDto): Promise<void> {
  await put(`categories/${id}`, user);
}

//EXPENSES

async function formatExpense(expense: ExpenseApi): Promise<Expense> {
  const user = await getOneUser(expense.id_user);
  const category = await getOneCategory(expense.id_category);
  return {
    id: expense.id,
    amount: expense.amount,
    label: expense.label,
    user: user,
    category: category,
    date: new Date(expense.date) ?? new Date(),
    participants: expense.participants ?? [],
  };
}

export async function getAllExpenses(): Promise<Expense[]> {
  const response = await get('expenses');
  const res: ExpenseApi[] = await response?.json();
  return Promise.all(res.map((e) => formatExpense(e)));
}

export async function getOneExpense(id: string): Promise<Expense> {
  const response = await get(`expenses/${id}`);
  const res = await response?.json();
  return await formatExpense({ ...res[0], id: id });
}

export async function createExpense(expense: ExpenseDto): Promise<void> {
  await post('expenses', expense);
}

export async function updateExpense(
  id: string,
  expense: ExpenseDto
): Promise<void> {
  await put(`expenses/${id}`, expense);
}

export async function removeExpense(id: string): Promise<void> {
  await remove(`expenses/${id}`);
}

export async function getTotalAmount(): Promise<number> {
  const response = await get('totalAmount');
  const res = await response?.json();
  return res.total;
}

export async function getUserAmount(id: string): Promise<number> {
  const response = await get(`totalAmount/${id}`);
  return await response?.json();
}
