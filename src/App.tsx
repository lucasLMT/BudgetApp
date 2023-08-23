import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ErrorScreen from "./pages/ErrorScreen";
import Main, { mainLoader } from "./layouts/Main";

//library
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

//actions
import { logoutAction } from "./actions/logout";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import { deleteBudget } from "./actions/deleteBudget";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
      loader: mainLoader,
      errorElement: <ErrorScreen />,
      children: [
        {
          path: "/",
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardAction,
          errorElement: <ErrorScreen />,
        },
        {
          path: "expenses",
          element: <ExpensesPage />,
          loader: expensesLoader,
          action: expensesAction,
        },
        {
          path: "budget/:id",
          element: <BudgetPage />,
          loader: budgetLoader,
          action: budgetAction,
          children: [{ path: "delete", action: deleteBudget }],
        },
        {
          path: "logout",
          action: logoutAction,
        },
      ],
    },

    {
      path: "*",
      element: <ErrorScreen />,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/BudgetApp" },
);

const App: FC = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
