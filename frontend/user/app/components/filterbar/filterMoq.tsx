import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

const style = {
  filterGroupTitle: "items-center flex text-[#222] font-bold justify-between leading-[22px] mb-3",
  inputMoq: "grow items-center bg-white border box-border flex h-9 p-2 rounded-lg border-solid border-[#ddd]",
  buttonOk: "text-[#222] font-semibold items-center border flex h-9 justify-center max-w-[400px] min-w-[60px] w-[59px] ml-1 rounded-[65px] border-solid border-[#222]",
};

type FilterMoqProps = {
  minOrder: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
};

export default function FilterMoq({
  minOrder,
  handleChange,
  handleClick
}: FilterMoqProps) {
  return (
    <div className='mb-5'>
      <div className={style.filterGroupTitle}>
        Min. order
      </div>
      <div className='items-center flex'>
        <Input
          className={style.inputMoq}
          name='minOrder'
          value={minOrder}
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
