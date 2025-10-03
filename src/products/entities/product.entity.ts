
export class Product {
  id: string;
  name: string;
  description: string | null;
  brandId: string;
  categoryId: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IProductPaginated {
  data: Product[];
  paginator: {
    totalResults: number | null;
    pages: number | null;
    currentPage: number| null;
    prevPage: number | null;
    nextPage: number | null;
    perPage: number | null;
    totalCurrentResults: number | null;
    lastPage: number | null;
  }
}
