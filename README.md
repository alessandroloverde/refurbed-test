# Senior Frontend Developer Assessment

## Welcome

Welcome to our hands-on assessment for the Senior Frontend Developer position!

### Objective

Your task is to enhance and fix a shopping cart application created by a junior developer. While the junior developer has successfully implemented the basic features, some advanced features are missing, and a few errors need fixing. Your goal is to add the missing functionalities, correct any mistakes, and provide detailed explanations for the changes you make, keeping in mind good e-commerce practices.

### Missing Features

1. The "Market switch" at the top should smoothly switch between different markets.
2. Connect two APIs to fetch the latest exchange rates and VAT rates. Use **CurrencyAPI** (Docs: [Latest Exchange Rates](https://currencyapi.com/docs/latest)) for exchange rates and **VatStack** (Docs: [List All Rates](https://vatstack.com/docs/rates)) for VAT rates.
3. Include VAT calculations (standard rate) to determine gross prices for products. Note that all product prices provided by us are net and in _EUR_.
4. Enhance state management by integrating Pinia.
5. _Optional:_ Improve responsiveness using Tailwind CSS (Docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)).

### Guidelines

- We're looking for good quality, production-ready code. Consider all aspects of frontend development.
- Apply best practices, patterns, modern JavaScript features, and Vue best practices. You can also introduce TypeScript.
- The junior developer you're assisting will review your work. **Provide explanations for each major change** through (multiline) commits, as shown in the example:

```bash
git commit -m 'Short summary' -m 'Detailed explanation...'
```

### Getting Started

1. Install the dependencies: `npm install`
2. Run the app: `npm run dev`

### Submission

- Once your solution is **production-ready**, run `npm run clean`, zip the entire `homework-vue` folder, and send it to us.




================================================================================================


# Project overview

Vue 3 + Vite shopping cart with multi-market support. Prices are net in EUR; the app fetches VAT rates (VatStack) and exchange rates (Frankfurter), computes gross prices per market, and displays them in the selected currency with locale-aware formatting (Intl).

**How I built it.** I started with a minimal setup: a test API fetch (VAT connection), a simple responsive layout container (Tailwind), and a basic Pinia store for exchange rates, VAT and selected market. I then expanded step by step: moved VAT and Currency API calls into dedicated services and env-based API keys; refactored the market dropdown so it’s driven by dynamic data (markets in a separate file), added flags and layout tweaks for the dropdown. Cart logic, price calculation and Intl formatting were moved into the store and a price helper; product data was moved to the domain layer; tables were replaced with a grid; remove-from-cart and loading/error states were added.

**What’s inside:** `src/stores/` — Pinia (market, cart); `src/services/` — VatStack & Frankfurter (exchange rates) clients; `src/domain/` — products and market config (locale per market); `src/utils/price.ts` — `Intl.NumberFormat` for currency.

**Features:** Market switch (dropdown with flags) in the header; product grid with gross price and stock; add/remove cart; cart total in selected currency; loading spinner and API error box; basic accessibility. Responsive layout with Tailwind.

**Tech stack:** Vue 3, Vite, Pinia, TypeScript, Tailwind CSS. APIs: VatStack (VAT rates), [Frankfurter](https://www.frankfurter.app/) (exchange rates, free, no API key). 
Env: set `VITE_VATSTACK_API_KEY` for VAT data; exchange rates use Frankfurter and require no key.


⚠️ TS can't be fully implemented in App.vue due to an incorret esLint setting.
⚠️ Accessibility has been implemented to a basic level.
⚠️ I've made a mistake with locale settings, inferring them from country code. I've moved them to the markets.ts object since they require a counscious decision and research.
⚠️ APIs data are still logged for quick data testing and reference.
⚠️ I know… emojis may not be the best idea but as a quick solution they're ok 🙂
