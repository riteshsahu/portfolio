import { ROUTE_PATH } from "@/constants";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTE_PATH.DASHBOARD);
  return <main className="min-h-screen p-6"></main>;
}
