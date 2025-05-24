import { style } from "./style";
import Logo from "./logo";
import SearchBar from "./searchBar";
import { RightNavigation } from "./rightNavigation";
import { Link } from "react-router";

type OptionProps = {
  search: string;
  minPrice: number;
  maxPrice: number;
  minimumOrderQuantity: number;
};

type NavbarProps = {
  option: OptionProps;
  setOption: React.Dispatch<React.SetStateAction<OptionProps>>;
};

export default function Navbar({
  option,
  setOption,
}: NavbarProps) {
  return (
    <header className={style.headerContent}>
      <div className={style.tnhMain}>
        {/* Logo */}
        <Link to='/'>
          <Logo />
        </Link>

        {/* Search Bar */}
        <SearchBar
          option={option}
          setOption={setOption}
        />

        {/* Right Navigation */}
        <RightNavigation />
      </div>
    </header>
  );
};
