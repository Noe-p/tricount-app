import {
  Category,
  CategoryDto,
  Expense,
  ExpenseApi,
  ExpenseDto,
  User,
  UserDto,
  UsersAmount,
} from '../../types';
import { get, post, put, remove } from './api';

// Ce fichier contient les fonctions qui vont nous permettre de faire des requêtes HTTP vers notre API.

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

export async function getUser(id: string): Promise<User> {
  const response = await get(`users/${id}`);
  const user = await response?.json();
  return { ...user[0], id: id };
}

export async function removeUser(id: string): Promise<void> {
  await remove(`users/${id}`);
}

export async function createUser(user: UserDto): Promise<void> {
  await post('users', user);
}

export async function updateUser(id: string, user: UserDto): Promise<void> {
  await put(`users/${id}`, user);
}

//EXPENSES

// Cette fonction permet de récupérer les données de l'utilisateur et de la catégorie associée à une dépense.
async function formatExpense(expense: ExpenseApi): Promise<Expense> {
  const user = await getUser(expense.id_user);
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
  const res: ExpenseApi[] = (await response?.json()) ?? [];
  return Promise.all(res?.map((e) => formatExpense(e) ?? []));
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
  return res?.total;
}

export async function getUserAmount(id: string): Promise<number> {
  const response = await get(`totalAmount/users/${id}`);
  return await response?.json();
}

export async function getUsersAmount(): Promise<UsersAmount[]> {
  const response = await get('totalAmount/users');
  return await response?.json();
}
