import { PaymentMethod, PaymentType, Product } from './types';
import { CreditCard, Smartphone, QrCode, Wallet } from 'lucide-react';
import React from 'react';

export const MOCK_PRODUCT: Product = {
  id: 'prod_001',
  name: 'Vanguard Platform',
  price: 149000,
  originalPrice: 1250000,
  description: 'Platform all-in-one yang membuat lu nulis lebih cepat, ranking lebih tinggi, dan mendapatkan uang lebih banyak dari konten.',
  discountNote: 'Lifetime - Diskon berlaku hingga 31 Desember'
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'bca',
    name: 'BCA',
    type: PaymentType.BANK_TRANSFER,
    accountNumber: '2781940820',
    accountName: 'FAISAL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png',
    instruction: 'Transfer via BCA Mobile, KlikBCA, or ATM.',
    color: 'border-blue-700'
  },
  {
    id: 'dana',
    name: 'DANA',
    type: PaymentType.E_WALLET,
    accountNumber: '0895703068960',
    accountName: 'FAISAL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png',
    instruction: 'Send money to DANA number.',
    color: 'border-sky-500'
  },
  {
    id: 'gopay',
    name: 'GoPay',
    type: PaymentType.E_WALLET,
    accountNumber: '0895703068960',
    accountName: 'FAISAL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png',
    instruction: 'Top up or Transfer to GoPay user.',
    color: 'border-emerald-500'
  },
  {
    id: 'qris',
    name: 'QRIS',
    type: PaymentType.QRIS,
    accountName: 'FAISAL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/1200px-Logo_QRIS.svg.png',
    instruction: 'Scan QR Code using any supported payment app.',
    color: 'border-red-600'
  }
];

export const getIconForType = (type: PaymentType) => {
  switch (type) {
    case PaymentType.BANK_TRANSFER:
      return <CreditCard className="w-5 h-5" />;
    case PaymentType.E_WALLET:
      return <Wallet className="w-5 h-5" />;
    case PaymentType.QRIS:
      return <QrCode className="w-5 h-5" />;
    default:
      return <Smartphone className="w-5 h-5" />;
  }
};