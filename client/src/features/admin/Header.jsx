import { Button } from "@/components/ui/button";
import { AlignJustify, LogOut } from "lucide-react";

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
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
