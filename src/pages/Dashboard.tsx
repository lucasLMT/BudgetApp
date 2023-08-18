import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import type { ActionFunction } from "react-router";
import {
  fetchData,
  createBudget,
  UserData,
  BudgetData,
  createExpense,
} from "../helper.ts";

//components
import Intro from "../components/Intro.tsx";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm.tsx";
import AddExpenseForm from "../components/AddExpenseForm.tsx";

interface DashBoardLoaderData {
  userName: string;
  budgets: BudgetData;
}

export const dashboardLoader = (): DashBoardLoaderData => {
  const userName = fetchData("userName") as UserData;
  const budgets = fetchData("budgets") as BudgetData;
  return { userName, budgets };
};

export const dashboardAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  //const userName = data.get("userName");
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account.");
    }
  } else if (_action === "newBudget") {
    try {
      createBudget({
        name: values.newBudget as string,
        amount: values.newBudgetAmount as string,
      });
      toast.success("Budget created!");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("Unexpected error");
    }
  } else if (_action === "newExpense") {
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
  }

  return null;
};

const Dashboard: FC = () => {
  const { userName, budgets } = useLoaderData() as DashBoardLoaderData;

  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1 className="font-bold text-6xl my-6">
            Welcome back, <span className="text-accent">{userName}</span>
          </h1>
          <div className="grid">
            {budgets && budgets.length > 0 ? (
              <div className="grid gap-6 w-full">
                <AddBudgetForm />
                <AddExpenseForm budgets={budgets} />
              </div>
            ) : (
              <div className="grid w-full">
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
};

export default Dashboard;
