// Use relative URL in dev so Vite proxy avoids CORS; direct in production
const API_URL = import.meta.env.DEV
  ? '/api/frankfurter/latest'
  : 'https://api.frankfurter.dev/v1/latest';

type FrankfurterResponse = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

export async function fetchExchangeRates(base = 'EUR'): Promise<Record<string, number>> {
  const res = await fetch(`${API_URL}?from=${base}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch exchange rates: ${res.status}`);
  }

  const json: FrankfurterResponse = await res.json();

  // Frankfurter does not include the base currency in rates; add it for consistency
  return { [base]: 1, ...json.rates };
}
