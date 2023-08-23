import { FC } from "react";
import { NavLink, Form } from "react-router-dom";

//assets
import logomark from "../assets/logomark.svg";

interface NavData {
  username: string;
}

const Nav: FC<NavData> = ({ username }) => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
      <NavLink
        to="/"
        aria-label="Go to home"
        className="m-4 flex items-center space-x-2"
      >
        <img src={logomark} alt="" className="h-8" />
        <span className="text-4xl font-bold max-sm:hidden">HomeBudget</span>
      </NavLink>
      {username && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Delete user and all data?")) {
              event.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="m-4 rounded-md border border-orange-400 bg-orange-200 p-2 text-sm text-orange-400 hover:bg-orange-400 hover:text-orange-100"
          >
            <span className="tracking-wide">Delete User</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="ml-1 inline-block h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
