export type TabType =
  | "dashboard"
  | "orders"
  | "users"
  | "stats"
  | "products"
  | "queries"
  | "category";

export  type TabComponentType = {
    [key in TabType]: JSX.Element;
  };