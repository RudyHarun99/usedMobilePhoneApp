import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useOutletContext } from 'react-router';
import type { OptionProps } from "~/types";

const style = {
  filterGroupTitle: "items-center flex text-[#222] font-bold justify-between leading-[22px] mb-3",
  inputMoq: "grow items-center bg-white border box-border flex h-9 p-2 rounded-lg border-solid border-[#ddd]",
  buttonOk: "text-[#222] font-semibold items-center border flex h-9 justify-center max-w-[400px] min-w-[60px] w-[59px] ml-1 rounded-[65px] border-solid border-[#222]",
};

type FilterMoqProps = {
  option: OptionProps;
  setOption: React.Dispatch<React.SetStateAction<OptionProps>>;
  inputMinOrder: number;
  setInputMinOrder: React.Dispatch<React.SetStateAction<number>>;
};

export default function FilterMoq() {
  const {
    option, setOption,
    inputMinOrder, setInputMinOrder,
  } = useOutletContext() as FilterMoqProps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputMinOrder(Number(value));
  };

  const handleClick = () => {
    setOption({
      ...option,
      minimumOrderQuantity: inputMinOrder,
    });
  };

  return (
    <div className='mb-5'>
      <div className={style.filterGroupTitle}>
        Min. order
      </div>
      <div className='items-center flex'>
        <Input
          className={style.inputMoq}
          name='minOrder'
          value={inputMinOrder}
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
