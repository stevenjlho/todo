"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function Main() {
  // todo
  const handleAdd = () => {};

  return (
    <div className="pt-4">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            完成少了几分
          </label>
        </div>
      </div>
    </div>
  );
}
