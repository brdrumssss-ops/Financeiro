
export enum TransactionStatus {
  PAID = 'Pago',
  PENDING = 'Pendente',
  SCHEDULED = 'Agendado',
}

export interface Transaction {
  id: string;
  date: string; // "YYYY-MM-DD"
  category: string;
  description?: string;
  amount: number;
  status: TransactionStatus;
}