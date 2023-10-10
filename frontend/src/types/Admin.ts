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
  category: CategoryList;
  productName: string;
  productDescription: string;
  sellingPrice: number;
  actualPrice: number;
  discountPercent: number;
  stockQuantity: number;
  minOrder: number;
  maxOrder: number;
  avgRating: number;
  images: ProductImages[];
  links: ExternalLinks[];
}

export interface ProductImages {
  imagePath: string;
  isPrimary?: boolean;
  imageKey: string;
}

export type ECommercePlatformName = "AMAZON" | "FLIPKART" | "MEESHO"|"Other";

export interface ExternalLinks {
  link: string;
  platformName: ECommercePlatformName;
}

export interface CreateProductRequest {
  categoryId: number;
  productName: string;
  productDescription: string;
  sellingPrice: number;
  actualPrice: number;
  discountPercent: number;
  stockQuantity: number;
  images: ProductImages[];
  links: ExternalLinks[];
}

export interface UpdateProductRequest extends CreateProductRequest {
  id?: number;
}

export interface CategoryList extends Category {
  id: number;
  count:number;
  version?: number;
  createAt?: string;
  updatedAt?: string;
}
export interface Category {
  categoryName: string;
  categoryDescription: string;
  imagePath?: string;
  imageKey?: string;
}

export interface Link {
  id: number;
  version: number;
  createAt: string;
  updatedAt: string;
  link: string;
  platformName: string;
}

export interface ContactDetailsList extends ContactDetails {
  id: number;
}

export interface CreateContactDetails extends ContactDetails {}

export interface ContactDetails {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export interface MessageCount {
  count: number;
}

export interface FileResponse {
  entityKey: string;
  imagePath: string;
  imageKey: string;
}
