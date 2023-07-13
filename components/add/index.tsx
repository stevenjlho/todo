"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTodoStore from "@/stores";

export default function Main() {
  const store = useTodoStore();

  // set todoValue from input value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    store.changeTodoValue(val)
  }

  // add todo
  const handleAdd = () => {
    store.setPageLoading(true) 

    try {
      store.addTodo({
        id: String(Math.random() * 1000),
        title: store.todoValue
      });
      store.setPageLoading(false);
      store.changeTodoValue('');
    } catch (error) {
      console.error(error);
      store.setPageLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input value={store.todoValue} onChange={handleChange} type="email" placeholder="Add a task" />
      <Button type="submit" onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
}
