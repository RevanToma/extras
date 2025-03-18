import axios from 'axios';

export const getExchangeRates = async (baseCurrency: string = 'USD') => {
  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
    );

    if (!response) throw new Error('Failed to fetch exchange rates');

    return response.data.rates;
  } catch (error) {
    console.error('Currency API error:', error);
    return null;
  }
};
