import { style } from "./style";
import ProfileIcon from "~/assets/person-profile.svg";
import SvgIcon from "~/components/ui/icon";

export default function SignIn() {
  return (
    <div className={style.tnhSignIn}>
      <SvgIcon
        data={ProfileIcon}
        className={style.tnhIcon}
      />
      <span className="text-[18px]">Sign in</span>
    </div>
  );
};
