import FilterPrice from './filterPrice';
import FilterMoq from './filterMoq';

export default function FilterBar() {
  return (
    <div className='bg-white px-3 py-5'>
      <FilterPrice />
      <FilterMoq />
    </div>
  );
};
