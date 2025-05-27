import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { trpc } from '~/lib/trpc';
import CardProduct, { ProductCardSkeleton } from '~/components/cardProduct';
import FilterBar from '~/components/filterbar/filterBar';
import PageBar from '~/components/pageBar';
import SortBar from '~/components/sortBar';
import ErrorFetch from "~/components/errorFetch";
import type { OptionProps } from "~/types";
import type { SortBy } from '~/types';
import type { SortOrder } from '~/types';
import type { ProductType } from '~/types';

const style = {
  mainWrap: "overflow-hidden relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-5",
  mainContainer: "flex flex-col lg:flex-row w-full mb-5 gap-6",
  searchLeftBody: "lg:shrink-0 lg:w-[200px] w-full",
  productList: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-5",
  contentWrapper: "bg-white mb-5 p-4 sm:p-5 rounded-lg shadow-sm",
  insideWrapper: "flex gap-1 items-center text-sm justify-end min-h-[36px]",
  loadingContainer: "min-h-[400px] flex items-center justify-center",
  errorContainer: "min-h-[400px] flex items-center justify-center",
  emptyContainer: "min-h-[400px] flex flex-col items-center justify-center text-gray-500",
  emptyIcon: "w-16 h-16 mb-4 text-gray-400",
  emptyText: "text-lg font-medium",
  skeletonGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-5",
};

type ProductsProps = {
  option: OptionProps;
};

export default function Products() {
  const { option } = useOutletContext() as ProductsProps;
  const [currentPage, setCurrentPage] = useState(0);
  const [inputSortBy, setInputSortBy] = useState<SortBy>('name');
  const [inputSortOrder, setInputSortOrder] = useState<SortOrder>('asc');
  const {
    data, isLoading, error
  } = trpc.products.list.useQuery({
    ...option,
    limit: 9,
    offset: currentPage * 9,
    sortBy: inputSortBy,
    sortOrder: inputSortOrder,
  });
  const total = data?.metadata?.total;

  const renderContent = () => {
    if (error) {
      return (
        <div className={style.errorContainer}>
          <ErrorFetch message={error.message} />
        </div>
      );
    }

    if (!isLoading && !data?.products.length) {
      return (
        <div className={style.emptyContainer}>
          <svg
            className={style.emptyIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>No products found</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className={style.emptyText}>No products found</p>
        </div>
      );
    }

    return (
      <>
        <div className={style.contentWrapper}>
          <SortBar
            inputSortBy={inputSortBy}
            setInputSortBy={setInputSortBy}
            setInputSortOrder={setInputSortOrder}
          />
        </div>
        <div className={style.productList}>
          {isLoading ? (
            // Show skeleton loading state
            Array.from({ length: 8 }).map(() => {
              const uniqueKey = crypto.randomUUID();
              return <ProductCardSkeleton key={uniqueKey} />;
            })
          ) : (
            data?.products.map((product: ProductType) => (
              <CardProduct
                key={product.id}
                product={{
                  ...product,
                  imageUrl: product.imageUrl ?? ''
                }}
              />
            ))
          )}
        </div>
        {!isLoading && (
          <div className={style.contentWrapper}>
            <PageBar
              total={total ?? 0}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className={style.mainWrap}>
      <div className={style.mainContainer}>
        <div className={style.searchLeftBody}>
          <FilterBar />
        </div>
        <div className="grow lg:max-w-[calc(100%_-_220px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
