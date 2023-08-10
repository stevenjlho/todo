"use client";

import React from "react";
import { todoTypeList } from "@/lib/constant";
import Icon from "@/lib/icon";
import useTodoStore from "@/stores";
import { apiFetchTodos } from "@/lib/request";

export default function Sidebar() {
  const store = useTodoStore();

  const handleSetTodoType = async (type: number) => {
    try {
      const page = 1;
      const limit = 10;
      store.setPageLoading(true);

      store.changeTodoType(type)
      const {data} = await apiFetchTodos(page, limit);
      store.setTodoList(data?.todos ?? []);
    } catch(error) {
      console.log(error)
    }

    store.setPageLoading(false);
  }

  return (
    <div className="w-56 basis-56 border-r border-solid">
      <ul className="sidebar mt-6">
        {todoTypeList.map((item) => (
          <li key={item.value} className={`${store.todoType === item.value && 'bg-blue-100'} cursor-pointer`} onClick={() => handleSetTodoType(item.value)}>
            <div className="flex p-3">
              <Icon name={item.icon} />
              <span className="pl-2">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
