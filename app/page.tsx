import { ModeToggle } from "@/components/mode-toggle";
import Topbar from "@/components/topbar";
import Sidebar from "@/components/sidebar";
import Add from "@/components/add";
import List from "@/components/list";

export default async function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-auto m-6">
          <Add />
          <List />
        </div>
      </div>
    </div>
  );
}
