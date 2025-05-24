import { style } from "./style";
import Image from "~/components/ui/image";
import IdIcon from "~/assets/id.png";

export default function Deliver() {
  return (
    <div className={style.tnhShipTo}>
      <div className="flex flex-col">
        <span className={style.deliverSpan}>Deliver to:</span>
        <div className={style.tnhCountryFlag}>
          <Image
            src={IdIcon}
            alt="flag"
            className="h-3.5 mr-1"
          />
          <span className="font-medium"> ID</span>
        </div>
      </div>
    </div>
  );
};
