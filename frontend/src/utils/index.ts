export const calculateDiscountPercentage = (
  regularPrice: number,
  sellingPrice: number
): number =>
  parseFloat((((regularPrice - sellingPrice) / regularPrice) * 100).toFixed(1));
