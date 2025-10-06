// filter.ts
export function filterProducts(products: any[], filters: any) {
  return products.filter((p) => {
    if (filters.category && !p.category?.toLowerCase().includes(filters.category.toLowerCase())) return false;
    if (filters.price_max && p.price > filters.price_max) return false;
    if (filters.keyword && !p.title?.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
    return true;
  });
}
