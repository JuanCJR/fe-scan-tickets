export interface Ticket {
  state: string;
  payMethod: string;
  sector: string;
  date: Date;
  purchaseDate: Date;
  price: number;
  quantity: number;
  userId: number;
  customerId: number;
}
