import {
  ActionFunction,
  ActionFunctionArgs,
  Params,
  redirect,
} from "react-router-dom";
import { ExpenseData, deleteItem, getAllMatchingItems } from "../helper";
import { toast } from "react-toastify";

interface DeleteBudgetArgs extends ActionFunctionArgs {
  params: Params<"id">;
}

export const deleteBudget: ActionFunction = ({ params }: DeleteBudgetArgs) => {
  try {
    deleteItem({ key: "budgets", id: params.id });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id || "",
    }) as ExpenseData[];

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }

  return redirect("/");
};
