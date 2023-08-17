//Local Storage
export const fetchData = (key: string): string => {
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
  const existingBudgets = fetchData("budgets") ?? [];

  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(existingBudgets.length + 1),
  };

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const deleteItem = ({ key }: { key: string }) => {
  localStorage.removeItem(key);
};
