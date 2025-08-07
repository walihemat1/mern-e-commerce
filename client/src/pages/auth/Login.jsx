import Form from "@/ui/Form";
import { registerFormControls } from "../../config/index";

function AuthLogin() {
  return (
    <div>
      <Form formControls={registerFormControls} />
    </div>
  );
}

export default AuthLogin;
