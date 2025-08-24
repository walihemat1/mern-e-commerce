import { toast } from "./use-toast";
import { logoutUser } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogoutUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.status) {
        toast({
          title: "Logged out successfully!",
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

  return handleLogout;
};
