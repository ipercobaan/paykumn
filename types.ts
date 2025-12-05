export enum PaymentType {
  BANK_TRANSFER = 'BANK_TRANSFER',
  E_WALLET = 'E_WALLET',
  QRIS = 'QRIS'
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentType;
  accountNumber?: string; // QRIS might not need this displayed prominently
  accountName: string;
  logo: string; // URL or placeholder for the logo
  instruction: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  discountNote?: string;
}

export interface ReceiptData {
  amount?: number;
  date?: string;
  senderName?: string;
  transactionId?: string;
  isValidReceipt: boolean;
  imageUrl?: string; // Added for ImgBB url
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
}