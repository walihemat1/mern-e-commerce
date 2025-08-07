import { useState } from "react";
import { Link } from "react-router-dom";

import { registerFormControls } from "@/config";
import Form from "@/ui/Form";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);

  const submitHandler = (e) => {
    e.preventDefault();

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
