import { style } from "./style";
import Logo from "./logo";
import SearchBar from "./searchBar";
import { RightNavigation } from "./rightNavigation";
import { Link } from "react-router";
import type { OptionProps } from "~/types";

type NavbarProps = {
  option: OptionProps;
  setOption: React.Dispatch<React.SetStateAction<OptionProps>>;
  inputSearch: string;
  setInputSearch: React.Dispatch<React.SetStateAction<string>>;
  setInputMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setInputMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  setInputMinOrder: React.Dispatch<React.SetStateAction<number>>;
};

export default function Navbar({
  option,
  setOption,
  inputSearch,
  setInputSearch,
  setInputMinPrice,
  setInputMaxPrice,
  setInputMinOrder,
}: NavbarProps) {
  const handleCLick = () => {
    setOption({
      ...option,
      search: '',
      minPrice: 0,
      maxPrice: 0,
      minimumOrderQuantity: 0,
    });
    setInputSearch('');
    setInputMinPrice(0);
    setInputMaxPrice(0);
    setInputMinOrder(0);
  };

  return (
    <header className={style.headerContent}>
      <div className={style.tnhMain}>
        {/* Logo */}
        <Link to='/' onClick={handleCLick}>
          <Logo />
        </Link>

        {/* Search Bar */}
        <SearchBar
          option={option}
          setOption={setOption}
          inputSearch={inputSearch}
          setInputSearch={setInputSearch}
        />

        {/* Right Navigation */}
        <RightNavigation />
      </div>
    </header>
  );
};
