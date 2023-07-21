"use client";

import {useEffect} from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import useTodoStore from "@/stores";
import { apiFetchTodos, apiUpdateTodos, apiDeleteTodos } from "@/lib/request";
import { useSession } from "next-auth/react";


export default function Main() {
  const store = useTodoStore();
  const { data: session } = useSession();

  const fetchTodos = async () => {
    const page = 1;
    const limit = 10;

    store.setPageLoading(true);

    try {
      const {data} = await apiFetchTodos(page, limit);
      store.setTodoList(data?.todos ?? []);
    } catch (error: any) {
      console.log(error);
    }

    store.setPageLoading(false);
  };

  // todo
  const handleDelete = async (id: number) => {
    try {
      await apiDeleteTodos(id);
      store.deleteTodo(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id: number, completed: boolean) => {
    try {
      await apiUpdateTodos(id, {
        completed: !completed
      });
      store.deleteTodo(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
    // window.addEventListener("focus", fetchFeedbacks);
    // return () => {
    //   window.removeEventListener("focus", fetchFeedbacks);
    // };
  }, []);

  return (
    <div className="pt-4">
      {store.todos.map((item) => (
        <div key={item.id}>
          <div
            className="flex items-center space-x-2 mb-3"
          >
            <Checkbox id="terms" checked={item.completed} onCheckedChange={() => handleUpdate(item.id, item.completed)} />
            <label
              htmlFor="terms"
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${item.completed && 'line-through'}`}
            >
              {item.title}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
