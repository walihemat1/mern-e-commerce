import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";

import { registerUser } from "../../features/auth/authSlice";
import { registerFormControls } from "@/config";
import Form from "@/ui/Form";

const initialState = {
  username: "ahmad",
  email: "ahmad@gmail.com",
  password: "12345",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData))
      .then((data) => {
        if (data?.payload?.status) {
          toast({
            title: data?.payload?.message || "User was created successfully!",
          });
          navigate("/auth/login");
        } else {
          toast({
            title: data?.payload?.message || "Something went wrong!",
            variant: "destructive",
          });
        }
      })
      .catch((err) => console.log(err));

    setFormData(initialState);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create a new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      <Form
        formData={formData}
        onSubmit={submitHandler}
        formControls={registerFormControls}
        setFormData={setFormData}
        buttonText="Sign up"
      />
    </div>
  );
}

export default AuthRegister;
