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

const router = createBrowserRouter([
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
        path: "logout",
        action: logoutAction,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorScreen />,
  },
]);

const App: FC = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
