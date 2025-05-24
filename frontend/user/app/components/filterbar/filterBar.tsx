import FilterPrice from './filterPrice';
import FilterMoq from './filterMoq';

type FilterBarProps = {
  minPrice: number;
  maxPrice: number;
  minOrder: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
};

export default function FilterBar({
  minPrice,
  maxPrice,
  minOrder,
  handleChange,
  handleClick
}: FilterBarProps) {
  return (
    <div className='bg-white px-3 py-5'>
      <FilterPrice
        minPrice={minPrice}
        maxPrice={maxPrice}
        handleChange={handleChange}
        handleClick={handleClick}
      />
      <FilterMoq
        minOrder={minOrder}
        handleChange={handleChange}
        handleClick={handleClick}
      />
    </div>
  );
};
