import { FC } from "react";

import { fetchData, ExpenseData, deleteItem } from "../helper.ts";
import { ActionFunction, useLoaderData } from "react-router-dom";
import Table from "../components/Table.tsx";
import { toast } from "react-toastify";

interface ExpensesLoaderData {
  expenses: ExpenseData[];
}

export const expensesLoader = async (): Promise<ExpensesLoaderData> => {
  const expenses = fetchData("expenses") as ExpenseData[];
  return { expenses };
};

export const expensesAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  //const userName = data.get("userName");
  const { _action, ...values } = Object.fromEntries(data);
  console.log(_action);
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId.toString(),
      });
      toast.success(`Expense deleted!`);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("There was a problem deleting your expense.");
    }
  }
  return null;
};

const ExpensesPage: FC = () => {
  const { expenses } = useLoaderData() as ExpensesLoaderData;
  return (
    <div>
      <h1 className="font-bold text-6xl mb-6">All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div>
          <h2 className="font-bold text-2xl mt-4">
            Recent Expenses{" "}
            <small className="text-sm">({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p className="font-normal">No expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
