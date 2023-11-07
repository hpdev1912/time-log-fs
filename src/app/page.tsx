import Calendar from "@/components/Calendar";
import Logs from "@/components/Logs";
import Navbar from "@/components/Navbar";
import NewLog from "@/components/NewLog";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <div className="p-5 space-y-10">
      <Navbar />
      <NewLog />
      <Calendar />
      <Logs />
    </div>
  );
}
