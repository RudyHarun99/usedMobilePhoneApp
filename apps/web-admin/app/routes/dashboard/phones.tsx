import { useState } from "react";
import { DataTable } from "~/components/ui/data-table";
import { Button } from "~/components/ui/button";
import { Pencil, Trash2, Database } from "lucide-react";
import { AddPhoneForm } from "~/components/phones/add-phone-form";
import type { AddPhoneFormData } from "~/components/phones/add-phone-form";
import { EditPhoneForm } from "~/components/phones/edit-phone-form";
import { LoadingState } from "~/components/ui/loading-state";
import { ErrorState } from "~/components/ui/error-state";
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
import { generateSlug } from "~/lib/utils";

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

  const handleAddProduct = async (data: AddPhoneFormData) => {
    try {
      setFormError(null);
      const name = data.name;
      const slug = generateSlug(name);
      const sku = `${slug}-${Date.now()}`;
      await createProduct.mutateAsync({
        ...data,
        price: Number(data.price),
        sku,
        slug,
      });
    } catch (error) {
      setFormError((error as TRPCClientErrorLike<AppRouter>)?.message || "Failed to create product");
      console.error("Failed to create product:", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (data: AddPhoneFormData) => {
    if (!editingProduct) return;
    
    try {
      setFormError(null);
      const name = data.name;
      const slug = generateSlug(name);
      const sku = `${slug}-${Date.now()}`;
      await updateProduct.mutateAsync({
        id: editingProduct.id,
        data: {
          ...data,
          price: Number(data.price),
          sku,
          slug,
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
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        return (
          <div className="font-medium">
            {name}
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return (
          <div className="max-w-[200px] truncate hidden md:block" title={description}>
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
        return (
          <div className="font-medium">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(price))}
          </div>
        );
      },
    },
    {
      accessorKey: "stockQuantity",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.getValue("stockQuantity") as number;
        return (
          <div className={`font-medium ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {stock}
          </div>
        );
      },
    },
    {
      accessorKey: "minimumOrderQuantity",
      header: "Min Order",
      cell: ({ row }) => {
        const minOrder = row.getValue("minimumOrderQuantity") as number;
        return (
          <div className="hidden sm:block">
            {minOrder}
          </div>
        );
      },
    },
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("imageUrl") as string | null;
        return (
          <div className="hidden md:block">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={row.getValue("name") as string}
                className="object-cover w-10 h-10 rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center w-10 h-10 text-gray-400 bg-gray-100 rounded-md">
                No image
              </div>
            )}
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
      <LoadingState
        message="Loading phones..."
        size="lg"
        className="p-12"
      />
    );
  }

  if (error || productsQuery.error) {
    return (
      <ErrorState
        title="Failed to Load Phones"
        message={error || (productsQuery.error as TRPCClientErrorLike<AppRouter>)?.message || "An error occurred while loading phones"}
        severity="error"
        onRetry={() => {
          setError(null);
          utils.products.list.invalidate();
        }}
        onDismiss={() => setError(null)}
        className="p-12"
      />
    );
  }

  const products = productsQuery.data?.products ?? [];
  if (products.length === 0) {
    return (
      <ErrorState
        title="No Phones Found"
        message="Add your first phone to get started. Click the 'Add Phone' button above to create a new phone listing."
        severity="info"
        className="p-12"
      />
    );
  }

  return (
    <div className="p-12 space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Manage Phones</h1>
        <div className="flex flex-col gap-4 sm:flex-row">
          <AddPhoneForm 
            onSubmit={handleAddProduct} 
            isSubmitting={createProduct.isPending}
            error={formError}
          />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <DataTable
          columns={columns}
          data={products}
        />
      </div>

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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Phone</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this phone? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button 
              variant="outline" 
              onClick={cancelDelete}
              disabled={deleteProduct.isPending}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteProduct.isPending}
              className="w-full sm:w-auto"
            >
              {deleteProduct.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 