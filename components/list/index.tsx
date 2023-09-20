"use client";

import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import useTodoStore from "@/stores";
import { apiFetchTodos, apiUpdateTodos, apiDeleteTodos } from "@/lib/request";
import { ChevronRight, ChevronDown, Trash2, Star } from "lucide-react";
import { TodoType } from "@/lib/constant";
import type { Todo } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Main() {
  const store = useTodoStore();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await apiDeleteTodos(id);
      store.deleteTodo(id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (item: Todo, field: keyof Todo) => {
    try {
      await apiUpdateTodos(item.id, {
        [field]: !item[field],
      });
      const list = store.todos.map((storeItem) => {
        if (item.id === storeItem.id) {
          return {
            ...storeItem,
            [field]: !item[field],
          };
        } else {
          return storeItem;
        }
      });
      store.setTodoList(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    store.fetchTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todosList = useMemo(() => {
    if (store.todoType === TodoType.Important) {
      return store.todos.filter((item) => item.important);
    } else {
      return store.todos;
    }
  }, [store.todos, store.todoType]);

  // work out the length of items which are completed
  const completedList = useMemo(() => {
    return store.todos.filter((item) => item.completed);
  }, [store.todos]);

  return (
    <div className="pt-4">
      {store.pageLoading ? (
        <Skeleton className="w-[100px] h-[100px] rounded-full" />
      ) : (
        <>
          <div className="pb-5">
            {todosList.map((item) => (
              <Sheet open={open} onOpenChange={setOpen} key={item.id}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={item.completed}
                      onCheckedChange={() => handleUpdate(item, "completed")}
                    />
                    <SheetTrigger asChild>
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {item.title}
                      </label>
                    </SheetTrigger>
                  </div>
                  {/* <span onClick={() => handleUpdateImportant(item.id, item.important)}> */}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleUpdate(item, "important")}
                  >
                    {item.important ? (
                      <Star size={20} color="#f4e21a" fill="#f4e21a" />
                    ) : (
                      <Star size={20} />
                    )}
                  </span>
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
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
          <Separator className="my-4" />
          <div
            className="flex items-center content-center cursor-pointer"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <ChevronDown /> : <ChevronRight />}
            <span className="pr-3">Completed</span>
            <span>{completedList.length}</span>
          </div>
          <div className="ml-4 mt-3">
            {visible &&
              completedList.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={item.id}
                    checked={item.completed}
                    onCheckedChange={() => handleUpdate(item, "completed")}
                  />
                  <label
                    htmlFor={item.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 line-through"
                  >
                    {item.title}
                  </label>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
