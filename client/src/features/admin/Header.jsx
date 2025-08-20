import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import Logout from "../auth/Logout";

function AdminHeader({ openSidebar, setOpenSidebar }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        className="lg:hidden sm:block"
        onClick={() => setOpenSidebar(true)}
      >
        <AlignJustify />
        <span className="">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Logout />
      </div>
    </header>
  );
}

export default AdminHeader;
