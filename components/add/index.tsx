"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Main() {
  // todo
  const handleAdd = () => {};

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit" onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
}
