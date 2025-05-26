import { useState, type ChangeEvent } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import type { ProductFormData } from "./add-phone-form";

interface EditPhoneFormProps {
  product: {
    id: string;
    sku: string;
    slug: string;
    name: string;
    description: string;
    price: string;
    imageUrl?: string | null;
    stockQuantity: number;
    minimumOrderQuantity: number;
  };
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function EditPhoneForm({ product, onSubmit, onCancel, isSubmitting = false }: EditPhoneFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    imageUrl: product.imageUrl ?? "",
    stockQuantity: product.stockQuantity,
    minimumOrderQuantity: product.minimumOrderQuantity,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === "price" || id === "stockQuantity" || id === "minimumOrderQuantity" 
        ? Number(value) 
        : value,
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    setFormData(prev => ({
      ...prev,
      name,
      slug,
    }));
  };

  return (
    <Dialog open onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Phone</DialogTitle>
          <DialogDescription>
            Make changes to the phone details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleNameChange}
                className="col-span-3"
                required
                placeholder="e.g., iPhone 14 Pro Max"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                required
                placeholder="Enter phone description..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="col-span-3"
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stockQuantity" className="text-right">
                Stock
              </Label>
              <Input
                id="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="col-span-3"
                required
                min="0"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minimumOrderQuantity" className="text-right">
                Min Order
              </Label>
              <Input
                id="minimumOrderQuantity"
                type="number"
                value={formData.minimumOrderQuantity}
                onChange={handleChange}
                className="col-span-3"
                required
                min="1"
                placeholder="1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 