import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import type { ActionFunction } from "react-router";
import { fetchData } from "../helper.ts";

//components
import Intro from "../components/Intro.tsx";
import { toast } from "react-toastify";

export const dashboardLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

export const dashboardAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  //const userName = data.get("userName");
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    toast.success(`Welcome, ${formData.userName}`);
  } catch (error) {
    throw new Error("There was a problem creating your account.");
  }
};

const Dashboard: FC = () => {
  const { userName } = useLoaderData() as { userName: string };

  return <div>{userName ? <p>{userName}</p> : <Intro />}</div>;
};

export default Dashboard;
