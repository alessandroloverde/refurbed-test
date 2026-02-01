const API_URL = 'https://api.currencyapi.com/v3/latest';

export async function fetchExchangeRates(base = 'EUR') {
  const res = await fetch(`${API_URL}?base_currency=${base}`, {
    headers: {
      apikey: import.meta.env.VITE_CURRENCY_API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch exchange rates: ${res.status}`);
  }

  const json = await res.json();
  console.log('Exchange rates:', json.data);
  return Object.fromEntries(
    Object.entries(json.data).map(([code, obj]) => [
      code,
      obj.value,
    ])
  );
}
