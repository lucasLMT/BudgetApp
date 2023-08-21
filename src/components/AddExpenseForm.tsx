import { FC, useEffect, useRef } from "react";
import { BudgetData } from "../helper";
import { useFetcher } from "react-router-dom";

const AddExpenseForm: FC<{ budgets: BudgetData[] }> = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef<HTMLFormElement>(null);
  const budgetExpenseField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
      budgetExpenseField.current?.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper rounded-xl max-w-3xl shadow-xl border-4 border-white p-2 grid gap-4 lg:w-1/2">
      <div className="border border-muted border-dashed p-4 rounded-xl">
        <h2 className="h3 font-bold text-2xl mb-4">
          Add New
          <span className="text-accent">
            {budgets.length === 1 && " " + budgets[0].name}
          </span>{" "}
          Expense
        </h2>
        <fetcher.Form method="post" className="grid gap-4" ref={formRef}>
          <div className="flex max-sm:flex-wrap gap-4">
            <div className="grid gap-1 w-full">
              <label htmlFor="newExpense" className="font-bold text-md">
                Expense Name
              </label>
              <input
                type="text"
                name="newExpense"
                id="newExpense"
                placeholder="e.g., Coffee"
                required
                className="bg-bkg border border-muted outline-none focus:border-2 focus:border-accent rounded-md p-2"
                ref={budgetExpenseField}
              />
            </div>
            <div className="grid gap-1 w-full">
              <label htmlFor="newExpenseAmount" className="font-bold text-md">
                Amount
              </label>
              <input
                type="number"
                step="0.1"
                name="newExpenseAmount"
                id="newExpenseAmount"
                placeholder="e.g., $3.50"
                required
                inputMode="decimal"
                className="bg-bkg border border-muted outline-none focus:border-2 focus:border-accent rounded-md p-2"
              />
            </div>
          </div>
          <input type="hidden" name="_action" value="newExpense" />
          <div
            className="grid gap-1"
            style={
              budgets.length === 1 ? { display: "none" } : { display: "grid" }
            }
          >
            <label htmlFor="newExpense" className="font-bold text-md">
              Budget Category
            </label>
            <select
              name="newExpenseBudget"
              id="newExpenseBudget"
              required
              className="bg-bkg border border-muted outline-none focus:border-2 focus:border-accent rounded-md p-2"
            >
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <button className="bg-gray-950 text-gray-200 p-2 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-4 ring-offset-2 focus:ring focus:ring-gray-950 hover:ring hover:ring-gray-950 transition-shadow w-fit">
            <span className="mr-2">Add Expense</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default AddExpenseForm;
