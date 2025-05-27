import { style } from "./style";
import GlobeIcon from "~/assets/globe.svg";
import SvgIcon from "~/components/ui/icon";

export default function Language() {
  return (
    <div className="relative flex">
      <div className="flex justify-center">
        <SvgIcon
          data={GlobeIcon}
          className={style.tnhIcon}
        />
        <span className="text-[18px]">English-USD</span>
      </div>
    </div>
  );
};
