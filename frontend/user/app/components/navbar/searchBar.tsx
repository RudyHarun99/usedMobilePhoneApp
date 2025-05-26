import { style } from "./style";
import Image from "../ui/image";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import SearchIcon from "~/assets/search-icon.svg";
import type { OptionProps } from "~/types";

type SearchBarProps = {
  option: OptionProps;
  setOption: React.Dispatch<React.SetStateAction<OptionProps>>;
  inputSearch: string;
  setInputSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({
  option,
  setOption,
  inputSearch,
  setInputSearch,
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  }

  const handleClick = () => {
    setOption({ ...option, search: inputSearch });
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
              value={inputSearch}
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
