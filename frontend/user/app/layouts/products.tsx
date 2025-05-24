import { trpc } from '~/lib/trpc';
import CardProduct from '~/components/cardProduct';
import { useOutletContext } from 'react-router';
import { useState } from 'react';
import FilterBar from '~/components/filterbar/filterBar';

const style = {
  mainWrap: "overflow-hidden relative max-w-[1500px] min-w-[1200px] mx-5 pt-5",
  mainContainer: "flex flex-row w-full mb-5",
  searchLeftBody: "shrink-0 min-w-[200px] w-[200px] mr-5",
  productList: "gap-[12px_20px] box-border grid grid-cols-[repeat(4,1fr)] mb-5",
};

type OptionProps = {
  search: string;
  minPrice: number;
  maxPrice: number;
  minimumOrderQuantity: number;
};

type ProductsProps = {
  option: OptionProps;
  setOption: React.Dispatch<React.SetStateAction<OptionProps>>;
};

export default function Products() {
  const [ minPrice, setMinPrice ] = useState(0);
  const [ maxPrice, setMaxPrice ] = useState(0);
  const [ minOrder, setMinOrder ] = useState(0);
  const { option, setOption } = useOutletContext() as ProductsProps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'minPrice') setMinPrice(Number(value));
    if (name === 'maxPrice') setMaxPrice(Number(value));
    if (name === 'minOrder') setMinOrder(Number(value));
  };

  const handleClick = () => {
    setOption({
      ...option,
      minPrice,
      maxPrice,
      minimumOrderQuantity: minOrder,
    });
  };

  const { data, isLoading, error } = trpc.products.list.useQuery(option);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className={style.mainWrap}>
      <div className={style.mainContainer}>
        <div className={style.searchLeftBody}>
          <FilterBar
            minPrice={minPrice}
            maxPrice={maxPrice}
            minOrder={minOrder}
            handleChange={handleChange}
            handleClick={handleClick}
          />
        </div>
        <div className='grow max-w-[calc(100%_-_220px)]'>
          <div className={style.productList}>
            {
              data?.products.map(product => {
                return (
                  <CardProduct
                    key={product.id}
                    product={
                      {
                        ...product,
                        imageUrl: product.imageUrl ?? ''
                      }
                    }
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};
