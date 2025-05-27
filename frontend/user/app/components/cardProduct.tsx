import { useState } from 'react';
import { Link } from "react-router";
import defaultImage from '~/assets/defaultImage.png';

const style = {
  productCardContainer: "overflow-hidden bg-white text-[#222] flex-col text-xs font-normal leading-4 flex justify-center relative p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200",
  productImage: "flex justify-center overflow-hidden relative rounded-xl p-1 w-full h-full",
  cardInfoWrapper: "flex flex-col h-full justify-between mt-3",
  productDesc: "text-sm sm:text-[15px] leading-[21px] max-w-[800px] line-clamp-2 text-ellipsis mb-2 sm:mb-3",
  productPrice: "text-xl sm:text-[28px] font-bold leading-[38px] overflow-hidden text-ellipsis break-all mb-1",
  minOrderText: "text-xs sm:text-sm text-gray-600",
  imageContainer: "relative w-full aspect-square mb-2 sm:mb-3 group",
  quickViewButton: "absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 opacity-0 group-hover:opacity-100",
  quickViewText: "px-4 py-2 text-sm font-medium text-white bg-black bg-opacity-75 rounded-md hover:bg-opacity-90 transition-colors",
  modalOverlay: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4",
  modalContent: "bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
  modalHeader: "flex items-center justify-between p-4 border-b",
  modalTitle: "text-lg font-semibold",
  modalClose: "p-2 hover:bg-gray-100 rounded-full transition-colors",
  modalBody: "p-4",
  modalImage: "w-full aspect-square object-cover rounded-lg mb-4",
  modalPrice: "text-2xl font-bold mb-2",
  modalDesc: "text-gray-600 mb-4",
  modalFooter: "flex justify-end gap-3 p-4 border-t",
  viewDetailsButton: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors",
  closeButton: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
  skeletonContainer: "animate-pulse",
  skeletonImage: "bg-gray-200 rounded-xl w-full aspect-square mb-2 sm:mb-3",
  skeletonText: "h-4 bg-gray-200 rounded mb-2",
  skeletonPrice: "h-8 bg-gray-200 rounded mb-2 w-24",
  skeletonMinOrder: "h-4 bg-gray-200 rounded w-32",
};

type Products = {
  id: string | number;
  name: string;
  imageUrl?: string;
  description: string;
  price: number | string;
  minimumOrderQuantity: number | string;
  stockQuantity: number;
}

type ProductProps = {
  product: Products;
  isLoading?: boolean;
}

export function ProductCardSkeleton() {
  return (
    <div className={style.productCardContainer}>
      <div className={style.skeletonContainer}>
        <div className={style.skeletonImage} />
        <div className={style.cardInfoWrapper}>
          <div className="space-y-2">
            <div className={style.skeletonText} />
            <div className={style.skeletonText} />
          </div>
          <div>
            <div className={style.skeletonPrice} />
            <div className={style.skeletonMinOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CardProduct({
  product,
  isLoading = false
}: ProductProps) {
  const [showQuickView, setShowQuickView] = useState(false);

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  const {
    id,
    name,
    imageUrl,
    description,
    price,
    minimumOrderQuantity,
    stockQuantity,
  } = product;

  return (
    <>
      <div className="block h-full">
        <div className={style.productCardContainer}>
          <div className={style.imageContainer}>
            <img
              src={imageUrl || defaultImage}
              alt={description}
              className={style.productImage}
              loading="lazy"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              className={style.quickViewButton}
              aria-label="Quick view"
            >
              <span className={style.quickViewText}>Quick View</span>
            </button>
          </div>
          <div className={style.cardInfoWrapper}>
            <p className={style.productDesc}>
              {description}
            </p>
            <div>
              <h2 className={style.productPrice}>
                US${price}
              </h2>
              <p className={style.minOrderText}>
                Min order: {minimumOrderQuantity} pieces
              </p>
            </div>
          </div>
        </div>
      </div>

      {showQuickView && (
        <div className={style.modalOverlay} onClick={() => setShowQuickView(false)}>
          <div className={style.modalContent} onClick={e => e.stopPropagation()}>
            <div className={style.modalHeader}>
              <h3 className={style.modalTitle}>{name}</h3>
              <button
                onClick={() => setShowQuickView(false)}
                className={style.modalClose}
                aria-label="Close quick view"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className={style.modalBody}>
              <img
                src={imageUrl || defaultImage}
                alt={name}
                className={style.modalImage}
              />
              <div className={style.modalPrice}>US${price}</div>
              <p className={style.modalDesc}>{description}</p>
              <p className="text-sm text-gray-600">Stock Quantity: {stockQuantity}</p>
              <p className="text-sm text-gray-600">Min order: {minimumOrderQuantity} pieces</p>
            </div>
            <div className={style.modalFooter}>
              <button
                onClick={() => setShowQuickView(false)}
                className={style.closeButton}
              >
                Close
              </button>
              <Link
                to={`/${id}`}
                className={style.viewDetailsButton}
                onClick={() => setShowQuickView(false)}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
