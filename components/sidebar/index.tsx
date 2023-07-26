"use client";

import React from "react";
import { todoTypeList } from "@/lib/constant";
import Icon from "@/lib/icon";

export default function Sidebar() {
  return (
    <div className="w-56 basis-56 border-r border-solid">
      <ul className="sidebar p-2">
        {todoTypeList.map((item) => (
          <li key={item.value} className="flex pt-2 pb-2">
            <Icon name={item.icon} />
            <span className="pl-2">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
