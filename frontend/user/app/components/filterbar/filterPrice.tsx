import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

const style = {
  filterGroupTitle: "items-center flex text-[#222] font-bold justify-between leading-[22px] mb-3",
  inputPriceMin: "grow w-12 items-center bg-white border box-border flex h-9 mr-1 p-2 rounded-lg border-solid border-[#ddd] text-xs",
  inputPriceMax: "grow w-12 items-center bg-white border box-border flex h-9 ml-1 p-2 rounded-lg border-solid border-[#ddd] text-xs",
  buttonOk: "text-[#222] font-semibold items-center border flex h-9 justify-center max-w-[400px] min-w-[60px] w-[59px] ml-1 rounded-[65px] border-solid border-[#222]",
};

type FilterPriceProps = {
  minPrice: number;
  maxPrice: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
};

export default function FilterPrice({
  minPrice,
  maxPrice,
  handleChange,
  handleClick
}: FilterPriceProps) {
  return (
    <div className='mb-5'>
      <div className={style.filterGroupTitle}>
        Price
      </div>
      <div className='items-center flex'>
        <Input
          className={style.inputPriceMin}
          placeholder='Min'
          name='minPrice'
          value={minPrice}
          onChange={handleChange}
        />
        -
        <Input
          className={style.inputPriceMax}
          placeholder='Max'
          name='maxPrice'
          value={maxPrice}
          onChange={handleChange}
        />
        <Button
          className={style.buttonOk}
          onClick={handleClick}
        >
          OK
        </Button>
      </div>
    </div>
  );
};
