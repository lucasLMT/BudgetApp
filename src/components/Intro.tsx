import { FC } from "react";
import { Form } from "react-router-dom";
import intro_illustration from "../assets/illustration.jpg";

const Intro: FC = () => {
  return (
    <div className="intro flex flex-wrap justify-center gap-8">
      <div className="grid gap-4 max-w-md">
        <h1 className="font-bold text-6xl">
          Take Control of <span className="text-accent">Your Money</span>
        </h1>
        <p className="text-lg">
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        <Form method="post" className="grid gap-4">
          <input
            type="text"
            name="userName"
            placeholder="What is your name?"
            required
            aria-label="Your Name"
            autoComplete="given-name"
            className="border-2 border-muted p-2 rounded-md w-full outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="bg-gray-950 text-gray-200 p-2 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-4 ring-offset-2 focus:ring focus:ring-gray-950 hover:ring hover:ring-gray-950 transition-shadow"
          >
            <span>Create Account</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline-block ml-2"
            >
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
            </svg>
          </button>
        </Form>
      </div>
      <img src={intro_illustration} alt="Person with money" />
    </div>
  );
};

export default Intro;
