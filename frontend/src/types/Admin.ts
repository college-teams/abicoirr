export type TabType =
  | "dashboard"
  | "orders"
  | "users"
  | "stats"
  | "products"
  | "queries"
  | "category";

export type TabComponentType = {
  [key in TabType]: JSX.Element;
};

export interface AdminOrderRequestData {
  userId: number;
  orderStatus: string;
  productIds: number[];
  quantity: number;
  unitPrice: number;
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
  paymentType: string;
  paymentStatus: string;
  deliveryDate: string;
  specialInstructions: string;
  orderNotes: string;
  trackingNumber: string;
}

export interface AdminOrderResponseData {
  id: number;
  userId: number;
  orderStatus: string;
  products: Product[];
  orderTimestamp: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
  paymentType: string;
  paymentStatus: string;
  deliveryDate: string;
  specialInstructions: string;
  orderNotes: string;
  trackingNumber: string;
}

export interface Product {
  id: number;
  version: number;
  createAt: string;
  updatedAt: string;
  category: Category;
  productName: string;
  productDescription: string;
  price: number;
  discountPercent: number;
  stockQuantity: number;
  minOrder: number;
  maxOrder: number;
  avgRating: number;
  images: string[];
  links: Link[];
}

export interface Category {
  id: number;
  version: number;
  createAt: string;
  updatedAt: string;
  categoryname: string;
  categoryDescription: string;
  imagePath: string;
  imageKey: string;
}

export interface Link {
  id: number;
  version: number;
  createAt: string;
  updatedAt: string;
  link: string;
  platformName: string;
}

export interface ContactDetails {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export interface MessageCount {
  count: number;
}
