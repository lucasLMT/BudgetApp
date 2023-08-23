import { FC } from "react";
import {
  ActionFunction,
  ActionFunctionArgs,
  Params,
  useLoaderData,
} from "react-router-dom";

// Components
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "./../components/Table";

// Utils
import {
  BudgetData,
  ExpenseData,
  createExpense,
  deleteItem,
  getAllMatchingItems,
} from "../helper";

// Libraries
import { toast } from "react-toastify";

interface loaderBudgetArgs extends ActionFunctionArgs {
  params: Params<"id">;
}

type budgetLoaderData = { budget: BudgetData; expenses: ExpenseData[] };

export const budgetLoader = async ({
  params,
}: loaderBudgetArgs): Promise<budgetLoaderData> => {
  const budgets = (await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id || "",
  })) as BudgetData[];

  const expenses = (await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id || "",
  })) as ExpenseData[];

  console.log(budgets, expenses);

  return { budget: budgets[0], expenses: expenses };
};

export const budgetAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  //const userName = data.get("userName");
  const { _action, ...values } = Object.fromEntries(data);
  console.log(_action);

  if (_action === "newExpense") {
    try {
      createExpense({
        name: values.newExpense.toString(),
        amount: values.newExpenseAmount.toString(),
        budgetId: values.newExpenseBudget.toString(),
      });
      toast.success(`Expense ${values.newExpense} created!`);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("There was a problem creating your expense.");
    }
  } else if (_action === "deleteExpense") {
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

const BudgetPage: FC = () => {
  const { budget, expenses } = useLoaderData() as budgetLoaderData;

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist.");
  }

  return (
    <div className="grid w-full gap-4">
      <h1 className="mb-4 text-6xl font-bold">
        <span className="text-accent">{budget.name}</span> Overview
      </h1>
      <div className="gap-4 lg:flex">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid gap-4">
          <h2 className="text-lg font-bold">
            <span className="text-accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
