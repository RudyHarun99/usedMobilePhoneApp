import { useParams, useNavigate } from 'react-router';
import { trpc } from '~/lib/trpc';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import LoadingFetch from "~/components/loadingFetch";
import ErrorFetch from "~/components/errorFetch";
import { useState, useEffect } from 'react';

export default function ProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(productId);

  const [formData, setFormData] = useState({
    sku: '',
    slug: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    stockQuantity: 0,
    minimumOrderQuantity: 1,
  });

  const { data: product, isLoading, error } = trpc.products.getById.useQuery(
    productId ?? '',
    { enabled: isEditing }
  );

  const createMutation = trpc.products.create.useMutation();
  const updateMutation = trpc.products.update.useMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku,
        slug: product.slug,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        imageUrl: product.imageUrl ?? '',
        stockQuantity: product.stockQuantity,
        minimumOrderQuantity: product.minimumOrderQuantity,
      });
    }
  }, [product]);

  if (isEditing && isLoading) return <LoadingFetch />;
  if (error) return <ErrorFetch message={error.message} />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: productId,
          data: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stockQuantity' || name === 'minimumOrderQuantity'
        ? Number(value)
        : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">SKU</label>
            <Input
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Price</label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Stock Quantity</label>
            <Input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Minimum Order Quantity</label>
            <Input
              type="number"
              name="minimumOrderQuantity"
              value={formData.minimumOrderQuantity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}