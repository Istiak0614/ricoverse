// client/src/lib/formatPrice.ts
// Prices are stored as whole taka (integers). formatPrice(1250) → "৳1,250"
const formatter = new Intl.NumberFormat('en-BD', {
  style: 'currency',
  currency: 'BDT',
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => formatter.format(amount);
