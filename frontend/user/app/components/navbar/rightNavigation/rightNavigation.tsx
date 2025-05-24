import { style } from "./style";
import Deliver from "./deliver";
import Language from "./language";
import Cart from "./cart";
import SignIn from "./signIn";
import { Button } from "~/components/ui/button";

export default function RightNavigation() {
  return (
    <div className={style.functional}>
      {/* Deliver to */}
      <Deliver />

      {/* Language/Currency Dropdown */}
      <Language />

      {/* Cart */}
      <div className={style.tnhLogin}>
        <Cart />

        {/* Sign In */}
        <SignIn />

        {/* Sign Up */}
        <Button className={style.tnhSignUp}>
          Sign up
        </Button>
      </div>
    </div>
  );
};
