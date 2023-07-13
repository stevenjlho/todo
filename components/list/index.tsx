"use client";

import { Checkbox } from "@/components/ui/checkbox";
import useTodoStore from "@/stores";

export default function Main() {
  const store = useTodoStore();
  console.log(store);

  const handleDelete = (id: string) => {
    try {
      store.deleteTodo(id)
    } catch(error) {
      console.log(error)
    }
  };

  return (
    <div className="pt-4">
      {store.todos.map((item) => (
        <div key={item.id}>
          <div className="flex items-center space-x-2 mb-1" onClick={() => handleDelete(item.id)}>
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
