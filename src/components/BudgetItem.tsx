import { FC } from "react";
import {
  BudgetData,
  formatCurrency,
  calculateSpentByBudget,
  formatPercentage,
} from "../helper";

interface BudgetItemData {
  budget: BudgetData;
}

const BudgetItem: FC<BudgetItemData> = ({ budget }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    // <div className="budget" style={{"--accent": color}}>
    <div className="budget grid gap-4 border-4 border-red-600 rounded-2xl p-4 text-red-500 flex-grow flex-shrink basis-[32%] max-w-xl shadow-xl mb-6 lg:mb-0">
      <div className="progress-text flex gap-4 justify-between text-lg items-center">
        <h3 className="h3 font-bold">{name}</h3>
        <p className="text-right">{formatCurrency(amount)} Budgeted</p>
      </div>
      <div className="h-4 w-full bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-4 bg-red-500 text-bkg text-center text-xs"
          style={{ width: `${(spent / amount) * 100}%` }}
        >
          {formatPercentage(spent / amount)}
        </div>
      </div>
      <div className="progress-text flex gap-4 justify-between text-lg items-center">
        <small className="text-sm">{formatCurrency(spent)} spent</small>
        <small className="text-muted text-sm text-right">
          {formatCurrency(amount - spent)} remaining
        </small>
      </div>
      <button className="bg-red-500 text-gray-200 p-2 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-4 ring-offset-2 focus:ring focus:ring-red-500 hover:ring hover:ring-red-500 transition-shadow w-fit mx-auto px-4">
        <span className="mr-2">View Details</span>
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
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      </button>
    </div>
  );
};

export default BudgetItem;
