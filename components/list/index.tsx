"use client";

import {useEffect} from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import useTodoStore from "@/stores";
import { apiFetchTodos } from "@/lib/request";

export default function Main() {
  const store = useTodoStore();

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

  const handleDelete = (id: number) => {
    try {
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
            className="flex items-center space-x-2 mb-1"
            onClick={() => handleDelete(item.id)}
          >
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.title}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
