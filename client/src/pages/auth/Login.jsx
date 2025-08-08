import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Form from "@/ui/Form";
import { loginFormControls } from "../../config/index";
import { useDispatch } from "react-redux";
import { checkAuth, loginUser, setUser } from "@/features/auth/authSlice";
import { toast } from "@/hooks/use-toast";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData))
      .then((data) => {
        if (data.payload?.status) {
          toast({
            title: "Logged in successfully!",
          });

          // dispatch(setUser({ ...data?.payload?.data?.user }));

          if (data?.payload?.data?.user?.role === "admin")
            return navigate("/admin/dashboard");
          if (data?.payload?.data?.user?.role === "user")
            return navigate("/shop/home");
        } else {
          toast({
            title: data.payload?.message,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Something went wrong!",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline ml-2"
          >
            Sign up
          </Link>
        </p>
      </div>

      <Form
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={submitHandler}
        buttonText="Sign in"
      />
    </div>
  );
}

export default AuthLogin;
