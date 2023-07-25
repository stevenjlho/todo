import { ModeToggle } from "@/components/mode-toggle";
import Topbar from "@/components/topbar";
import Sidebar from "@/components/sidebar";
import Add from "@/components/add";
import List from "@/components/list";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Topbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-auto">
          <Add />
          <List />
        </div>
      </div>
    </>
  );
}
