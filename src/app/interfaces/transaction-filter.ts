export interface TransactionFilter {
  date: string;
  product: string;
  category: string;
}
export interface RequestFilter {
  date: string;
  store: string;
  destination: string;
}
export interface PurchaseFilter {
  date: string;
  supplier: string;
  destination: string;
}
