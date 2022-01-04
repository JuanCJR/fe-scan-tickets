export interface TicketsGroupBySector {
  ticketsForSector: { sector: string; quantity: number; total: number }[];
  total: number;
  quantity: number;
}
