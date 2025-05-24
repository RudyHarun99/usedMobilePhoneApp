import { style } from "./style";
import Image from "../ui/image";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import SearchIcon from "~/assets/search-icon.svg";
import { useState } from "react";

type OptionProps = {
  search: string;
  minPrice: number;
  maxPrice: number;
  minimumOrderQuantity: number;
};

type SearchBarProps = {
  option: OptionProps;
  setOption: React.Dispatch<React.SetStateAction<OptionProps>>;
};

export default function SearchBar({
  option,
  setOption,
}: SearchBarProps) {
  const [ searchInput, setSearchInput ] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }

  const handleClick = () => {
    setOption({ ...option, search: searchInput });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleClick();
  };

  return (
    <div className={style.tnhSearchBar}>
      <div className={style.ifeHeaderSearchBar}>
        <div className={style.searchBarInner}>
          <div className={style.searchBarInputWrapper}>
            <Input
              type="text"
              maxLength={150}
              placeholder="used mobile phones"
              className={style.searchBarInput}
              value={searchInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button
            className={style.searchBarInnerButton}
            onClick={handleClick}
          >
            <Image
              src={SearchIcon}
              alt="search icon"
              className={style.searchIcon}
            />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};
