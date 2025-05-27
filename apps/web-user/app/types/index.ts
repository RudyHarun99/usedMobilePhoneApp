export type SortBy = 'name' | 'price' | 'stockQuantity' | 'createdAt';
export type SortOrder = 'asc' | 'desc';
export type OptionProps = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minimumOrderQuantity?: number;
  limit?: number;
  offset?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
};

export type ProductType = {
  id: string | number;
  sku: string;
  slug: string;
  name: string;
  imageUrl?: string | null;
  description: string;
  price: number | string;
  stockQuantity: number;
  minimumOrderQuantity: number | string;
  createdAt: string;
  updatedAt: string;
}