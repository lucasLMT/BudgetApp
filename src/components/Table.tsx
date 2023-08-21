import { FC } from "react";
import { ExpenseData } from "../helper";
import ExpenseItem from "./ExpenseItem";

interface Expenses {
  expenses: ExpenseData[];
}

const Table: FC<Expenses> = ({ expenses }) => {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-center border-separate border-gray-500 text-lg">
        <thead>
          <tr>
            {["Name", "Amount", "Date", "Budget", ""].map((i, index) => (
              <th key={index}>{i}</th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {expenses.map((expense) => (
            <tr key={expense.id} className="even:bg-neutral-200 h-12">
              <ExpenseItem expense={expense} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
