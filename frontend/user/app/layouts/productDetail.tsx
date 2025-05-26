import type { Route } from './+types/productDetail';
import { trpc } from '~/lib/trpc';
import CardDetail from '~/components/cardDetail';
import LoadingFetch from "~/components/loadingFetch";
import ErrorFetch from "~/components/errorFetch";
import NotFound from '~/components/notFound';

export default function ProductDetail({
  params
}: Route.ComponentProps) {
  const { productId } = params;
  const {
    data: product,
    isLoading,
    error,
  } = trpc.products.getById.useQuery(productId);

  if (isLoading) return <LoadingFetch />;
  if (error) return <ErrorFetch message={error.message} />;
  if (!product) return <NotFound />;

  return (
    <div className="relative pt-5 my-5 overflow-hidden mx-15">
      <CardDetail product={product} />
    </div>
  );
}
