import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import type { SortBy } from '~/types';
import type { SortOrder } from '~/types';

type SortProps = {
  inputSortBy: string;
  setInputSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
  setInputSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
};

export default function SortBar({
  inputSortBy,
  setInputSortBy,
  setInputSortOrder,
}: SortProps) {
  return (
    <div className="flex gap-1 items-center text-sm justify-end min-h-[36px]">
      <Select
        value={inputSortBy}
        onValueChange={(value: SortBy) => setInputSortBy(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="stockQuantity">Stock</SelectItem>
            <SelectItem value="createdAt">Created</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={() => setInputSortOrder('asc')}
        className='mx-1 px-3 py-1 border rounded'
      >&#x25B2;</Button>
      <Button
        onClick={() => setInputSortOrder('desc')}
        className='mx-1 px-3 py-1 border rounded'
      >&#x25BC;</Button>
    </div>
  );
};
