import type { Route } from './+types/productDetail';
import { trpc } from '~/lib/trpc';
import CardDetail from '~/components/cardDetail';

export default function ProductDetail({
  params
}: Route.ComponentProps) {
  const { productId } = params;
  const {
    data: product,
    isLoading,
    error,
  } = trpc.products.getById.useQuery(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="overflow-hidden relative my-5 mx-15 pt-5">
      <CardDetail product={product} />
    </div>
  );
}
