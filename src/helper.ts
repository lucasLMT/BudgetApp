//Local Storage
import { ExpenseData } from "./helper";
export type UserData = string;

interface BaseData {
  id: string;
  name: string;
  createdAt: number;
  amount: number;
}

export interface BudgetData extends BaseData {
  color: string;
}

export interface ExpenseData extends BaseData {
  budgetId: string;
}

export const fetchData = (
  key: string,
): UserData | BudgetData[] | ExpenseData[] => {
  return JSON.parse(localStorage.getItem(key) || "false");
};

const generateRandomColor = (length: number): string => {
  return `${length * 34} 65% 50%`;
};

interface budget {
  name: string;
  amount: string;
}

export const createBudget = ({ name, amount }: budget): void => {
  const existingBudgets = fetchData("budgets") || [];

  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(existingBudgets.length + 1),
  };

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem]),
  );
};

interface Expense {
  name: string;
  amount: string;
  budgetId: string;
}

export const createExpense = ({ name, amount, budgetId }: Expense): void => {
  const existingExpenses = fetchData("expenses") || [];

  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem]),
  );
};

export const deleteItem = ({ key, id }: { key: string; id?: string }) => {
  if (id) {
    const existingData = fetchData(key) as BaseData[];
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }

  localStorage.removeItem(key);
};

type Category = {
  category: string;
  key: keyof BudgetData | keyof ExpenseData;
  value: string;
};

export const getAllMatchingItems = ({ category, key, value }: Category) => {
  const data = fetchData(category) || [];

  if (Array.isArray(data)) {
    const matchingItems = data.filter((item) => item[key] === value);
    return matchingItems;
  }

  return data;
};

export const calculateSpentByBudget = (budgetId: string) => {
  const expenses = (fetchData("expenses") as ExpenseData[]) || [];

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
};

export const formatCurrency = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

export const formatPercentage = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDateToLocaleString = (epoch: number): string => {
  return new Date(epoch).toLocaleDateString();
};
