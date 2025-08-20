import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser()).then((data) => {
      console.log(data);
      if (data?.payload?.status) {
        toast({
          title: "Logged out successfull!",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: "Something went wrong. Please try again!",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Button
      className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
      onClick={() => logoutHandler()}
    >
      <LogOut />
      <span>Logout</span>
    </Button>
  );
}

export default Logout;
