import { ModeToggle } from "@/components/mode-toggle";
import Sidebar from "@/components/sidebar";
import Add from "@/components/add";
import List from "@/components/list";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-auto">
        <Add />
        <List />
      </div>
    </div>
  );
}
