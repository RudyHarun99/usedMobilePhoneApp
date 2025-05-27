import { Link } from "react-router";
import type { Route } from './+types/productDetail';
import { trpc } from '~/lib/trpc';
import CardDetail, { ProductDetailSkeleton } from '~/components/cardDetail';
import ErrorFetch from "~/components/errorFetch";

const style = {
  container: "relative pt-5 my-5 overflow-hidden mx-auto px-4 sm:px-6 lg:px-8 max-w-[1500px]",
  errorContainer: "min-h-[600px] flex items-center justify-center",
  notFoundContainer: "min-h-[600px] flex flex-col items-center justify-center text-gray-500",
  notFoundIcon: "w-16 h-16 mb-4 text-gray-400",
  notFoundText: "text-lg font-medium",
  backButton: "inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors",
  backIcon: "w-4 h-4",
};

export default function ProductDetail({
  params
}: Route.ComponentProps) {
  const { productId } = params;
  const {
    data: product,
    isLoading,
    error,
  } = trpc.products.getById.useQuery(productId);

  if (error) {
    return (
      <div className={style.errorContainer}>
        <ErrorFetch message={error.message} />
      </div>
    );
  }

  if (!isLoading && !product) {
    return (
      <div className={style.notFoundContainer}>
        <svg
          className={style.notFoundIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Product not found icon</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className={style.notFoundText}>Product not found</p>
        <Link to="/" className="mt-4 text-blue-600 transition-colors hover:text-blue-800">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <Link to="/" className={style.backButton}>
        <svg
          className={style.backIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Back to Products icon</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Products
      </Link>
      {product && <CardDetail product={product} isLoading={isLoading} />}
    </div>
  );
}
