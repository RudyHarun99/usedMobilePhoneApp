import { useState, type ChangeEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface AddPhoneFormProps {
  onSubmit: (data: ProductFormData) => void;
  isSubmitting?: boolean;
  error?: string | null;
}

export interface ProductFormData {
  sku: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stockQuantity: number;
  minimumOrderQuantity: number;
}

export function AddPhoneForm({ onSubmit, isSubmitting = false, error = null }: AddPhoneFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    sku: "",
    slug: "",
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    stockQuantity: 1,
    minimumOrderQuantity: 1,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    setFormData({
      sku: "",
      slug: "",
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      stockQuantity: 1,
      minimumOrderQuantity: 1,
    });
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
    const sku = `${slug}-${Date.now()}`;
    setFormData(prev => ({
      ...prev,
      name,
      slug,
      sku,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Phone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Phone</DialogTitle>
          <DialogDescription>
            Fill in the details of the phone you want to add to the inventory.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="mb-4">
            <ErrorMessage
              message={error}
              severity="error"
              onDismiss={() => setOpen(false)}
            />
          </div>
        )}
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Adding...
                </>
              ) : (
                "Add Phone"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 