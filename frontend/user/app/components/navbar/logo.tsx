import { style } from "./style";
import LogoImage from "~/assets/alibaba-logo.png";
import Image from "../ui/image";

export default function Logo() {
  return (
    <div className="flex">
      <Image
        src={LogoImage}
        alt="logo alibaba"
        className={style.tnhLogoContent}
      />
    </div>
  );
};
