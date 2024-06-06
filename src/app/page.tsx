"use client";
import { ROUTE_PATH } from "@/constants";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  redirect(ROUTE_PATH.DASHBOARD);

  return <main className="min-h-screen p-6"></main>;
}
