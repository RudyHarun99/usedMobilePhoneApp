import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { trpc } from '~/lib/trpc';
import CardProduct from '~/components/cardProduct';
import FilterBar from '~/components/filterbar/filterBar';
import PageBar from '~/components/pageBar';
import SortBar from '~/components/sortBar';
import LoadingFetch from "~/components/loadingFetch";
import ErrorFetch from "~/components/errorFetch";
import type { OptionProps } from "~/types";
import type { SortBy } from '~/types';
import type { SortOrder } from '~/types';

const style = {
  mainWrap: "overflow-hidden relative max-w-[1500px] min-w-[1200px] mx-5 pt-5",
  mainContainer: "flex flex-row w-full mb-5",
  searchLeftBody: "shrink-0 min-w-[200px] w-[200px] mr-5",
  productList: "gap-[12px_20px] box-border grid grid-cols-[repeat(4,1fr)] mb-5",
  contentWrapper: "bg-white mb-5 p-5",
  insideWrapper: "flex gap-1 items-center text-sm justify-end min-h-[36px]",
};

type ProductsProps = {
  option: OptionProps;
};

export default function Products() {
  const { option } = useOutletContext() as ProductsProps;
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ inputSortBy, setInputSortBy ] = useState<SortBy>('name');
  const [ inputSortOrder, setInputSortOrder] = useState<SortOrder>('asc');
  const {
    data, isLoading, error
  } = trpc.products.list.useQuery({
    ...option,
    limit: 8,
    offset: currentPage * 8,
    sortBy: inputSortBy,
    sortOrder: inputSortOrder,
  });
  const total = data?.metadata?.total;

  if (isLoading) return <LoadingFetch />;
  if (error) return <ErrorFetch message={error.message} />;

  return (
    <div className={style.mainWrap}>
      <div className={style.mainContainer}>
        <div className={style.searchLeftBody}>
          <FilterBar />
        </div>
        <div className='grow max-w-[calc(100%_-_220px)]'>
          <div className={style.contentWrapper}>
            <SortBar
              inputSortBy={inputSortBy}
              setInputSortBy={setInputSortBy}
              setInputSortOrder={setInputSortOrder}
            />
          </div>
          <div className={style.productList}>
            {
              data?.products.map(product => {
                return (
                  <CardProduct
                    key={product.id}
                    product={{
                      ...product,
                      imageUrl: product.imageUrl ?? ''
                    }}
                  />
                )
              })
            }
          </div>
          <div className={style.contentWrapper}>
            <PageBar
              total={total ?? 0}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
