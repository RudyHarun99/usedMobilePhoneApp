import { style } from "./style";
import CartIcon from "~/assets/shopping-cart-simple.svg";
import SvgIcon from "~/components/ui/icon";

export default function Cart() {
  return (
    <div className="mr-7">
      <div className="relative">
        <SvgIcon
          data={CartIcon}
          className={style.tnhIcon}
        />
      </div>
    </div>
  );
};
