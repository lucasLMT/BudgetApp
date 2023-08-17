import { FC } from "react";
import { useRouteError, useNavigate, Link } from "react-router-dom";

const ErrorScreen: FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage: string;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "Unknown error";
  }
  console.log(error);

  return (
    <div className="error">
      <div className="intro flex flex-wrap justify-center gap-8">
        <div className="grid gap-4 max-w-md text-center">
          <h1 className="font-bold text-6xl">Uh oh! We've got a problem.</h1>
          <p className="">{errorMessage}</p>
          <div className="flex gap-6 justify-center">
            <button
              className="bg-gray-950 text-gray-200 p-2 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-4 ring-offset-2 focus:ring focus:ring-gray-950 hover:ring hover:ring-gray-950 transition-shadow"
              onClick={() => {
                navigate(-1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 inline-block mr-3"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="">Go Back</span>
            </button>
            <Link
              to="/"
              className="bg-gray-950 text-gray-200 p-2 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-4 ring-offset-2 focus:ring focus:ring-gray-950 hover:ring hover:ring-gray-950 transition-shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 inline-block mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span className="">Go Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
