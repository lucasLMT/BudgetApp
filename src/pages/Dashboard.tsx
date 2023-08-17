import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import type { ActionFunction } from "react-router";
import { fetchData, createBudget } from "../helper.ts";

//components
import Intro from "../components/Intro.tsx";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm.tsx";

export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
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
      throw new Error("There was a problem creating your budget.");
    }
  } else {
  }
};

const Dashboard: FC = () => {
  const { userName } = useLoaderData() as { userName: string };

  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1 className="font-bold text-6xl my-6">
            Welcome back, <span className="text-accent">{userName}</span>
          </h1>
          <div className="grid">
            <div className="w-full">
              <div className="w-full">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
};

export default Dashboard;
