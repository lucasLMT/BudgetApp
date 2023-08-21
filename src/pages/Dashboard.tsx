import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import type { ActionFunction } from "react-router";
import {
  fetchData,
  createBudget,
  UserData,
  BudgetData,
  createExpense,
  ExpenseData,
} from "../helper.ts";

//components
import Intro from "../components/Intro.tsx";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm.tsx";
import AddExpenseForm from "../components/AddExpenseForm.tsx";
import BudgetItem from "../components/BudgetItem.tsx";
import Table from "../components/Table.tsx";

interface DashBoardLoaderData {
  userName: string;
  budgets: BudgetData[];
  expenses: ExpenseData[];
}

export const dashboardLoader = (): DashBoardLoaderData => {
  const userName = fetchData("userName") as UserData;
  const budgets = fetchData("budgets") as BudgetData[];
  const expenses = fetchData("expenses") as ExpenseData[];
  return { userName, budgets, expenses };
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
  const { userName, budgets, expenses } =
    useLoaderData() as DashBoardLoaderData;

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
                <div className="lg:flex lg:gap-6">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2 className="h3 font-bold text-2xl mb-4">Existing Budgets</h2>
                <div className="budgets flex flex-wrap gap-6 max-w-7xl w-full">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget}></BudgetItem>
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses.sort(
                        (a, b) => b.createdAt - a.createdAt
                      )}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                <h2 className="h3 text-xl">
                  Personal budgeting is the secret to financial freedom.
                </h2>
                <h2 className="h3 text-xl">Create a budget to get started!</h2>
                <div className="grid w-full">
                  <AddBudgetForm />
                </div>
              </>
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
