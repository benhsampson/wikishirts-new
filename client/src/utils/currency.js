export const convertToDollars = (priceInCents) => priceInCents / 100;

export const formatAsCurrency = (priceInDollars) =>
  priceInDollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
