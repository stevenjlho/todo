"use client";

import React from "react";
import { todoType } from "./constant";

export default function Sidebar() {
  return (
    <div className="w-56 basis-56">
      <ul className="sidebar">
        {todoType.map((item) => (
          <li key={item.value}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
}
