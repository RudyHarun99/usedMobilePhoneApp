import { style } from "./style";
import Image from "../ui/image";
import LogoImage from "~/assets/alibaba-logo.png";

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
