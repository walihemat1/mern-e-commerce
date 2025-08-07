import { Link } from "react-router-dom";
import { useState } from "react";

import Form from "@/ui/Form";
import { loginFormControls } from "../../config/index";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(formData);
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
