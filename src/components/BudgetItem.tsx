import { FC } from "react";
import {
  BudgetData,
  formatCurrency,
  calculateSpentByBudget,
  formatPercentage,
} from "../helper";
import { Form, Link } from "react-router-dom";

interface BudgetItemData {
  budget: BudgetData;
  showDelete?: boolean;
}

const BudgetItem: FC<BudgetItemData> = ({ budget, showDelete }) => {
  const { id, name, amount } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    // <div className="budget" style={{"--accent": color}}>
    <div className="budget mb-6 grid max-w-xl flex-shrink flex-grow basis-[32%] gap-4 rounded-2xl border-4 border-red-600 p-4 text-red-500 shadow-xl lg:mb-0">
      <div className="progress-text flex items-center justify-between gap-4 text-lg">
        <h3 className="h3 font-bold">{name}</h3>
        <p className="text-right">{formatCurrency(amount)} Budgeted</p>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-4 bg-red-500 text-center text-xs text-bkg duration-300 ease-out"
          style={{
            width: `${
              (spent / amount) * 100 <= 100 ? (spent / amount) * 100 : 100
            }%`,
          }}
        >
          {formatPercentage(spent / amount)}
        </div>
      </div>
      <div className="progress-text flex items-center justify-between gap-4 text-lg">
        <small className="text-sm">{formatCurrency(spent)} spent</small>
        <small className="text-right text-sm text-muted">
          {formatCurrency(amount - spent)} remaining
        </small>
      </div>
      {showDelete ? (
        <Form
          method="post"
          action="delete"
          className="grid items-center"
          onSubmit={(event) => {
            if (
              !confirm(
                "Are you sure you want to permanently delete this budget?",
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="mx-auto w-fit cursor-pointer rounded-lg bg-red-500 p-2 px-4 text-gray-200 ring-offset-2 transition-shadow hover:ring hover:ring-red-500 focus:outline-none focus:ring focus:ring-red-500 focus-visible:ring-4"
          >
            <span>Delete Budget</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="ml-2 inline-block h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </Form>
      ) : (
        <Link
          to={`/budget/${id}`}
          className="mx-auto w-fit cursor-pointer rounded-lg bg-red-500 p-2 px-4 text-gray-200 ring-offset-2 transition-shadow hover:ring hover:ring-red-500 focus:outline-none focus:ring focus:ring-red-500 focus-visible:ring-4"
        >
          <span className="mr-2">View Details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="inline-block h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default BudgetItem;
