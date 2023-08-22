import { FC } from "react";
import { useLoaderData, Outlet } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// helper
import { fetchData } from "../helper.ts";

// components
import Nav from "../components/Nav.tsx";

export const mainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

const Main: FC = () => {
  const { userName } = useLoaderData() as { userName: string };

  return (
    <div
      id="layout"
      className="grid grid-rows-[auto,1fr,auto] h-screen items-center justify-center bg-bkg"
    >
      <Nav username={userName} />
      <main className="max-w-7xl w-full grid items-start p-4 mx-auto">
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
