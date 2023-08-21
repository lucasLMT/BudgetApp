//Local Storage
export type UserData = string;

export type BudgetData = {
  id: string;
  name: string;
  createdAt: number;
  amount: number;
  color: string;
};

export const fetchData = (
  key: string
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
  console.log(existingBudgets);

  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(existingBudgets.length + 1),
  };
  console.log(newItem);

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

interface Expense {
  name: string;
  amount: string;
  budgetId: string;
}

export type ExpenseData = {
  id: string;
  name: string;
  createdAt: number;
  amount: number;
  budgetId: string;
};

export const createExpense = ({ name, amount, budgetId }: Expense): void => {
  const existingExpenses = fetchData("expenses") || [];

  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  console.log(newItem);

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const deleteItem = ({ key }: { key: string }) => {
  localStorage.removeItem(key);
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
