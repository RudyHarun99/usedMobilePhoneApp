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