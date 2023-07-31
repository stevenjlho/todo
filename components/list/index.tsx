"use client";

import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import useTodoStore from "@/stores";
import { apiFetchTodos, apiUpdateTodos, apiDeleteTodos } from "@/lib/request";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Main() {
  const store = useTodoStore();

  const fetchTodos = async () => {
    const page = 1;
    const limit = 10;
    store.setPageLoading(true);

    try {
      const { data } = await apiFetchTodos(page, limit, store.todoType);
      store.setTodoList(data?.todos ?? []);
    } catch (error: any) {
      console.log(error);
    }

    store.setPageLoading(false);
  };

  // todo
  const handleDelete = async (id: string) => {
    try {
      await apiDeleteTodos(id);
      store.deleteTodo(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id: string, completed: boolean) => {
    try {
      await apiUpdateTodos(id, {
        completed: !completed,
      });
      const list = store.todos.map(item => {
        return {
          ...item,
          completed: item.id === id ? !item.completed : item.completed,
        }
      })
      store.setTodoList(list)
      // store.deleteTodo(id);
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
        <Sheet key={item.id}>
          <div className="flex items-center space-x-2 mb-3">
            <Checkbox
              id={item.id}
              checked={item.completed}
              onCheckedChange={() => handleUpdate(item.id, item.completed)}
            />
            <SheetTrigger asChild>
              <label
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  item.completed && "line-through"
                }`}
              >
                {item.title}
              </label>
            </SheetTrigger>
          </div>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{item.title}</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4"></div>
              <div className="grid grid-cols-4 items-center gap-4"></div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
