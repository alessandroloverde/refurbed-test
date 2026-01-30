## Just a test for Alessandro

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

---

Happy Coding,  
refurbed frontend apps team
