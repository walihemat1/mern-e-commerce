import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogoutUser } from "../../hooks/useLogout";

function Logout() {
  const handleLogout = useLogoutUser();

  return (
    <Button
      className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
      onClick={handleLogout}
    >
      <LogOut />
      <span>Logout</span>
    </Button>
  );
}

export default Logout;
