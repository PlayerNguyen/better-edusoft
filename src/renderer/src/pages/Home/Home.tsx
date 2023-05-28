import classNames from "classnames";
import React from "react";
import Header from "./components/Header";
import NextSchedule from "./components/NextSchedule";

export default function Home() {
  return (
    <div
      className={classNames("px-4 py-4 flex flex-col gap-4", "overflow-auto")}
    >
      {/* Header */}
      <Header />

      <NextSchedule />
    </div>
  );
}
