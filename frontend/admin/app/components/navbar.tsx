import { Link } from 'react-router';
import { Input } from './ui/input';
import { Button } from './ui/button';
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

export function Navbar({
  option,
  setOption,
  inputSearch,
  setInputSearch,
  setInputMinPrice,
  setInputMaxPrice,
  setInputMinOrder,
}: NavbarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const handleSearch = () => {
    setOption({ ...option, search: inputSearch });
  };

  const handleReset = () => {
    setOption({
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
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={handleReset}>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={inputSearch}
                onChange={handleChange}
                className="w-64"
              />
              <Button onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}