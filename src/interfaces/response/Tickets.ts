export interface Tickets {
  id: number;
  state: string;
  payMethod: string;
  sector: string;
  date: Date;
  purchaseDate: Date;
  price: number;
  quantity: number;
  total: number;
  Customer: {};
  user: {};
}
