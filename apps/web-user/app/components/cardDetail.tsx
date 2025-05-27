import defaultImage from '~/assets/defaultImage.png';
import type { ProductType } from '~/types';

const style = {
  mainContainer: "flex flex-col lg:flex-row w-full mb-5 justify-center p-4 sm:p-6 bg-white rounded-xl shadow-sm",
  detailContainer: "w-full max-w-[1204px] gap-6 sm:gap-10 flex flex-col",
  detailInfo: "w-full lg:h-[536px] gap-6 flex flex-col lg:flex-row",
  detailImageContainer: "w-full lg:w-[400px] aspect-square lg:h-[400px] overflow-hidden rounded-lg",
  detailContent: "w-full lg:w-[780px] gap-4 sm:gap-6 flex flex-col",
  detailName: "text-[#0A0D12] text-lg sm:text-xl leading-[34px] font-semibold",
  detailPrice: "text-[#0A0D12] text-xl sm:text-2xl leading-9 font-bold",
  detailDesc: "gap-2 text-[#0A0D12] px-0 py-4 sm:py-6 border-y border-[#D5D7DA] border-t border-solid border-b",
  descTitle: "text-base sm:text-lg leading-8 font-semibold mb-2",
  descContent: "w-full text-sm sm:text-[14px] leading-7 font-normal",
  detailFooter: "mt-4",
  detailQuantity: "flex flex-row gap-4 mb-4 sm:mb-6",
  minQuantity: "text-[#181D27] text-sm sm:text-base leading-[30px] font-bold",
  stockText: "text-sm sm:text-base text-gray-600",
  skeletonContainer: "animate-pulse",
  skeletonImage: "bg-gray-200 rounded-lg w-full aspect-square",
  skeletonTitle: "h-8 bg-gray-200 rounded w-3/4 mb-2",
  skeletonPrice: "h-10 bg-gray-200 rounded w-32 mb-4",
  skeletonDescTitle: "h-6 bg-gray-200 rounded w-32 mb-3",
  skeletonDesc: "space-y-2",
  skeletonDescLine: "h-4 bg-gray-200 rounded",
  skeletonFooter: "mt-4 space-y-2",
  skeletonFooterLine: "h-5 bg-gray-200 rounded w-48",
  actionButtons: "flex flex-wrap gap-3 mt-4",
  shareButton: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors",
  shareIcon: "w-4 h-4",
  copyButton: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors",
  copyIcon: "w-4 h-4",
  tooltip: "absolute bottom-4 right-4 bg-black bg-opacity-75 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
};

export function ProductDetailSkeleton() {
  return (
    <div className={style.mainContainer}>
      <div className={style.detailContainer}>
        <div className={style.detailInfo}>
          <div className={style.detailImageContainer}>
            <div className={style.skeletonContainer}>
              <div className={style.skeletonImage} />
            </div>
          </div>
          <div className={style.detailContent}>
            <div className="gap-1.5">
              <div className={style.skeletonTitle} />
              <div className={style.skeletonPrice} />
            </div>
            <div className={style.detailDesc}>
              <div className={style.skeletonDescTitle} />
              <div className={style.skeletonDesc}>
                <div className={style.skeletonDescLine} />
                <div className={style.skeletonDescLine} />
                <div className={style.skeletonDescLine} />
                <div className={style.skeletonDescLine} />
              </div>
            </div>
            <div className={style.detailFooter}>
              <div className={style.skeletonFooter}>
                <div className={style.skeletonFooterLine} />
                <div className={style.skeletonFooterLine} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CardDetail({
  product,
  isLoading = false
}: {
  product: ProductType;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  const {
    name,
    description,
    price,
    imageUrl,
    stockQuantity,
    minimumOrderQuantity,
  } = product;

  return (
    <div className={style.mainContainer}>
      <div className={style.detailContainer}>
        <div className={style.detailInfo}>
          <div className={style.detailImageContainer}>
            <img
              src={imageUrl || defaultImage}
              alt={name?.trim() || "Default product image"}
              title={name?.trim() || "Product image"}
              className="object-cover w-full h-full"
              loading="lazy"
            />
            <div className={style.tooltip}>
              Click to view full size
            </div>
          </div>
          <div className={style.detailContent}>
            <div className="gap-1.5">
              <div className={style.detailName}>
                {name}
              </div>
              <div className={style.detailPrice}>
                US${price}
              </div>
            </div>
            <div className={style.detailDesc}>
              <p className={style.descTitle}>
                Description
              </p>
              <p className={style.descContent}>
                {description}
              </p>
            </div>
            <div className={style.detailFooter}>
              <div className={style.detailQuantity}>
                <p className={style.stockText}>Stock Quantity: {stockQuantity}</p>
              </div>
              <div className={style.minQuantity}>
                Min order: {minimumOrderQuantity} pieces
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
