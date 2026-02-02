const API_URL = 'https://api.vatstack.com/v1/rates?limit=100';

export async function fetchVatRates() {
  const res = await fetch(API_URL, {
    headers: {
      'X-API-KEY': import.meta.env.VITE_VATSTACK_API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch VAT rates');
  }

  const json = await res.json();
  console.log('VAT rates:', json.rates);

  return Object.fromEntries(
    json.rates.map(rate => [
      rate.country_code,
      rate.standard_rate / 100
    ])
  )
}
