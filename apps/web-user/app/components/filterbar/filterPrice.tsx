import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useOutletContext } from 'react-router';
import type { OptionProps } from "~/types";

const style = {
  filterGroupTitle: "items-center flex text-[#222] font-bold justify-between leading-[22px] mb-3",
  inputPriceMin: "grow w-12 items-center bg-white border box-border flex h-9 mr-1 p-2 rounded-lg border-solid border-[#ddd] text-xs",
  inputPriceMax: "grow w-12 items-center bg-white border box-border flex h-9 ml-1 p-2 rounded-lg border-solid border-[#ddd] text-xs",
  buttonOk: "text-[#222] font-semibold items-center border flex h-9 justify-center max-w-[400px] min-w-[60px] w-[59px] ml-1 rounded-[65px] border-solid border-[#222]",
};

type FilterPriceProps = {
  option: OptionProps;
  setOption: React.Dispatch<React.SetStateAction<OptionProps>>;
  inputMinPrice: number;
  setInputMinPrice: React.Dispatch<React.SetStateAction<number>>;
  inputMaxPrice: number;
  setInputMaxPrice: React.Dispatch<React.SetStateAction<number>>;
};

export default function FilterPrice() {
  const {
    option, setOption,
    inputMinPrice, setInputMinPrice,
    inputMaxPrice, setInputMaxPrice
  } = useOutletContext() as FilterPriceProps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'minPrice') setInputMinPrice(Number(value));
    if (name === 'maxPrice') setInputMaxPrice(Number(value));
  }

  const handleClick = () => {
    setOption({
      ...option,
      minPrice: inputMinPrice,
      maxPrice: inputMaxPrice,
    });
  };

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
          value={inputMinPrice}
          onChange={handleChange}
        />
        -
        <Input
          className={style.inputPriceMax}
          placeholder='Max'
          name='maxPrice'
          value={inputMaxPrice}
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
