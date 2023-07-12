import { ModeToggle } from "@/components/mode-toggle";
import Sidebar from "@/components/sidebar";
import Add from "@/components/add";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-auto">
        <Add />
      </div>
    </div>
  );
}
