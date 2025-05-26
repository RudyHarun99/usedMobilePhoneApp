import { useState } from "react";
import { DataTable } from "~/components/ui/data-table";
import { Button } from "~/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AddPhoneForm, type ProductFormData } from "~/components/phones/add-phone-form";
import { EditPhoneForm } from "~/components/phones/edit-phone-form";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useToast } from "~/components/ui/use-toast";
import type { ColumnDef } from "@tanstack/react-table";
import type { Route } from "./+types/phones";
import { trpc } from "~/lib/trpc";
import type { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "@backend/trpc/routers";
import React from "react";

export function meta(_args: Route["MetaArgs"]) {
  return [
    { title: "Phones - Admin Dashboard" },
    { name: "description", content: "Manage your phone inventory" },
  ];
}

interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string | null;
  stockQuantity: number;
  minimumOrderQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export default function PhonesPage() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const { toast } = useToast();

  const utils = trpc.useUtils();
  const productsQuery = trpc.products.list.useQuery();
  
  React.useEffect(() => {
    if (productsQuery.error) {
      setError((productsQuery.error as TRPCClientErrorLike<AppRouter>)?.message || "Failed to load products");
    }
  }, [productsQuery.error]);

  const createProduct = trpc.products.create.useMutation({
    onSuccess: () => {
      utils.products.list.invalidate();
      toast({
        title: "Success",
        description: "Product created successfully",
      });
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      });
    },
  });

  const updateProduct = trpc.products.update.useMutation({
    onSuccess: () => {
      utils.products.list.invalidate();
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      });
    },
  });

  const deleteProduct = trpc.products.delete.useMutation({
    onSuccess: () => {
      utils.products.list.invalidate();
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    },
  });

  const handleAddProduct = async (data: ProductFormData) => {
    try {
      setFormError(null);
      await createProduct.mutateAsync({
        ...data,
        price: Number(data.price),
      });
    } catch (error) {
      setFormError((error as TRPCClientErrorLike<AppRouter>)?.message || "Failed to create product");
      console.error("Failed to create product:", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!editingProduct) return;
    
    try {
      setFormError(null);
      await updateProduct.mutateAsync({
        id: editingProduct.id,
        data: {
          ...data,
          price: Number(data.price),
        },
      });
      setEditingProduct(null);
    } catch (error) {
      setFormError((error as TRPCClientErrorLike<AppRouter>)?.message || "Failed to update product");
      console.error("Failed to update product:", error);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setDeletingProductId(id);
  };

  const confirmDelete = async () => {
    if (!deletingProductId) return;
    
    try {
      await deleteProduct.mutateAsync(deletingProductId);
      setDeletingProductId(null);
    } catch (error) {
      // Error is handled by the mutation's onError callback
      console.error("Failed to delete product:", error);
    }
  };

  const cancelDelete = () => {
    setDeletingProductId(null);
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return (
          <div className="max-w-[200px] truncate" title={description}>
            {description}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price") as string;
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(price));
      },
    },
    {
      accessorKey: "stockQuantity",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.getValue("stockQuantity") as number;
        return (
          <div className={
              `font-medium ${stock > 0 ?
              "text-green-600" :
              "text-red-600"}`
            }>
            {stock}
          </div>
        );
      },
    },
    {
      accessorKey: "minimumOrderQuantity",
      header: "Min Order",
    },
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("imageUrl") as string | null;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt={row.getValue("name") as string}
            className="object-cover w-10 h-10 rounded-md"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 text-gray-400 bg-gray-100 rounded-md">
            No image
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditProduct(product)}
                    className="hover:bg-blue-100 hover:text-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                    <span className="sr-only">Edit {product.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit {product.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete {product.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete {product.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

  if (productsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || productsQuery.error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <ErrorMessage
          message={error || (productsQuery.error as TRPCClientErrorLike<AppRouter>)?.message || "An error occurred"}
          severity="error"
          onDismiss={() => setError(null)}
        />
      </div>
    );
  }

  const products = productsQuery.data?.products ?? [];
  if (products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <ErrorMessage
          message="No products found. Add your first product to get started."
          severity="info"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Phones</h1>
        <AddPhoneForm 
          onSubmit={handleAddProduct} 
          isSubmitting={createProduct.isPending}
          error={formError}
        />
      </div>

      <DataTable
        columns={columns}
        data={products}
      />

      {editingProduct && (
        <EditPhoneForm
          product={editingProduct}
          onSubmit={handleUpdateProduct}
          onCancel={() => {
            setEditingProduct(null);
            setFormError(null);
          }}
          isSubmitting={updateProduct.isPending}
          error={formError}
        />
      )}

      <Dialog open={deletingProductId !== null} onOpenChange={() => setDeletingProductId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Phone</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this phone? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={cancelDelete}
              disabled={deleteProduct.isPending}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 