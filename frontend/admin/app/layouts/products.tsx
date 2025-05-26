import { useState } from 'react';
import { useOutletContext, Link } from 'react-router';
import { trpc } from '~/lib/trpc';
import { Button } from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import FilterBar from '~/components/filterbar/filterBar';
import PageBar from '~/components/pageBar';
import SortBar from '~/components/sortBar';
import LoadingFetch from "~/components/loadingFetch";
import ErrorFetch from "~/components/errorFetch";
import type { OptionProps, SortBy, SortOrder } from "~/types";

export default function Products() {
  const { option } = useOutletContext<{ option: OptionProps }>();
  const [currentPage, setCurrentPage] = useState(0);
  const [inputSortBy, setInputSortBy] = useState<SortBy>('name');
  const [inputSortOrder, setInputSortOrder] = useState<SortOrder>('asc');

  const { data, isLoading, error } = trpc.products.list.useQuery({
    ...option,
    limit: 10,
    offset: currentPage * 10,
    sortBy: inputSortBy,
    sortOrder: inputSortOrder,
  });

  const deleteMutation = trpc.products.delete.useMutation();

  if (isLoading) return <LoadingFetch />;
  if (error) return <ErrorFetch message={error.message} />;

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteMutation.mutateAsync(id);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <div className="grid grid-cols-[250px_1fr] gap-6">
        <FilterBar />
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <SortBar
              inputSortBy={inputSortBy}
              setInputSortBy={setInputSortBy}
              setInputSortOrder={setInputSortOrder}
            />
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Min Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stockQuantity}</TableCell>
                    <TableCell>{product.minimumOrderQuantity}</TableCell>
                    <TableCell className="space-x-2">
                      <Link to={`/products/${product.id}/edit`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <PageBar
              total={data?.metadata.total ?? 0}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}